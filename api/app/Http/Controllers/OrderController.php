<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Order_Items;
use App\Models\Endereco;
use App\Models\DadosCartao;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
   public function index(Request $request)
{
    $user = $request->user();

    if (!$user) {
        return response()->json([
            'message' => 'Usuário não autenticado'
        ], 401);
    }

    $orders = Order::with([
            'order_items.product',
            'endereco',
            'cartao'
        ])
        ->where('id_user', $user->id)
        ->orderBy('created_at', 'desc')
        ->get();

    return response()->json($orders, 200);
}

    public function checkout(Request $request)
    {
        try {
            $request->validate([
                'total_price' => 'required|numeric|min:0',
                'items' => 'required|array|min:1',
                'items.*.id_product' => 'required|exists:products,id',
                'items.*.quantity' => 'required|integer|min:1',
                'items.*.price' => 'required|numeric|min:0',

                'endereco_id' => 'nullable|exists:enderecos,id',
                'payment_method' => 'required|string|in:PIX,Cartão de Crédito,pix,cartao',
                'card_id' => 'nullable|exists:dados_cartao,id',
            ]);

            DB::beginTransaction();

            $enderecoId = null;
            $enderecoSnapshot = null;

            if ($request->endereco_id) {
                $endereco = Endereco::where('id', $request->endereco_id)
                    ->where('user_id', $request->user()->id)
                    ->first();

                if (!$endereco) {
                    DB::rollBack();

                    return response()->json([
                        'error' => 'Endereço não encontrado para este usuário'
                    ], 404);
                }

                $enderecoId = $endereco->id;
                $enderecoSnapshot = "{$endereco->street}, {$endereco->number} - {$endereco->city} - CEP {$endereco->zip_code}";
            }

            $paymentMethod = $request->payment_method;

            if ($paymentMethod === 'pix') {
                $paymentMethod = 'PIX';
            }

            if ($paymentMethod === 'cartao') {
                $paymentMethod = 'Cartão de Crédito';
            }

            $cardId = null;
            $cardLastDigits = null;

            if ($paymentMethod === 'Cartão de Crédito') {
                if (!$request->card_id) {
                    DB::rollBack();

                    return response()->json([
                        'error' => 'Selecione um cartão para pagar com cartão de crédito'
                    ], 422);
                }

                $cartao = DadosCartao::where('id', $request->card_id)
                    ->where('user_id', $request->user()->id)
                    ->first();

                if (!$cartao) {
                    DB::rollBack();

                    return response()->json([
                        'error' => 'Cartão não encontrado para este usuário'
                    ], 404);
                }

                $cardId = $cartao->id;
                $cardLastDigits = substr($cartao->numero_cartao, -4);
            }

            $order = Order::create([
                'id_user' => $request->user()->id,
                'endereco_id' => $enderecoId,
                'endereco_snapshot' => $enderecoSnapshot,
                'total_price' => $request->total_price,
                'status' => 'Pedido realizado',
                'payment_method' => $paymentMethod,
                'card_id' => $cardId,
                'card_last_digits' => $cardLastDigits
            ]);

            foreach ($request->items as $item) {
                Order_Items::create([
                    'id_order' => $order->id,
                    'id_product' => $item['id_product'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price']
                ]);
            }

            DB::commit();

            $order->load([
                'order_items.product',
                'endereco',
                'cartao'
            ]);

            return response()->json([
                'message' => 'Compra realizada com sucesso! Os dados foram salvos em Minhas Compras.',
                'order' => $order
            ], 201);

        } catch (\Throwable $e) {
            DB::rollBack();

            return response()->json([
                'error' => 'Erro ao processar pedido',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function show(Request $request, $id)
    {
        $order = Order::with([
                'order_items.product',
                'endereco',
                'cartao'
            ])
            ->where('id_user', $request->user()->id)
            ->where('id', $id)
            ->first();

        if (!$order) {
            return response()->json([
                'message' => 'Nenhuma ordem encontrada'
            ], 404);
        }

        return response()->json($order, 200);
    }

    public function store(Request $request)
    {
        return $this->checkout($request);
    }

    public function update(Request $request, $id)
    {
        $order = Order::where('id_user', $request->user()->id)
            ->where('id', $id)
            ->first();

        if (!$order) {
            return response()->json([
                'message' => 'Ordem não encontrada'
            ], 404);
        }

        $order->update($request->all());

        return response()->json([
            'message' => 'Ordem atualizada'
        ], 200);
    }

    public function destroy(Request $request, $id)
    {
        $order = Order::where('id_user', $request->user()->id)
            ->where('id', $id)
            ->first();

        if (!$order) {
            return response()->json([
                'message' => 'Ordem não encontrada'
            ], 404);
        }

        $order->delete();

        return response()->json([
            'message' => 'Ordem deletada'
        ], 200);
    }
}