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
    public function showPublic($id)
    {
        try {
            $order = Order::find($id);

            if (!$order) {
                return response()->json([
                    'error' => 'Pedido não encontrado.'
                ], 404);
            }

            return response()->json([
                'id' => $order->id,
                'total_price' => $order->total_price,
                'status' => $order->status
            ], 200);

        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Erro ao processar consulta pública do pedido',
                'message' => $e->getMessage()
            ], 500);
        }
    }

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

                'shipping_service' => 'nullable|string|max:255',
                'shipping_company' => 'nullable|string|max:255',
                'shipping_price' => 'nullable|numeric|min:0',
                'shipping_delivery_time' => 'nullable|integer|min:0',
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

            if ($paymentMethod === 'pix' || $paymentMethod === 'PIX') {
                $paymentMethod = 'PIX';
            }

            if ($paymentMethod === 'cartao' || $paymentMethod === 'Cartão de Crédito') {
                $paymentMethod = 'Cartão de Crédito';
            }

            $statusInicial = 'teste';

            if ($paymentMethod === 'PIX') {
                $statusInicial = 'Aguardando pagamento';
            } else {
                $statusInicial = 'Pago';
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
                'status' => $statusInicial,
                'payment_method' => $paymentMethod,
                'card_id' => $cardId,
                'card_last_digits' => $cardLastDigits,

                'shipping_service' => $request->shipping_service,
                'shipping_company' => $request->shipping_company,
                'shipping_price' => $request->shipping_price,
                'shipping_delivery_time' => $request->shipping_delivery_time,
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
                'order' => $order,
                'id' => $order->id,
                'order_id' => $order->id
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

    public function confirmarPagamento(Request $request)
    {
        try {
            $request->validate([
                'id_order' => 'required|exists:orders,id',
                'status' => 'required|string|in:Pago,Cancelado'
            ]);

            $order = Order::find($request->id_order);

            if (!$order) {
                return response()->json([
                    'error' => 'Pedido não encontrado.'
                ], 404);
            }

            $order->status = $request->status;
            $order->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Status do pedido atualizado com sucesso!',
                'order_id' => $order->id,
                'novo_status' => $order->status
            ], 200);

        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Erro interno ao confirmar pagamento do pedido.',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}