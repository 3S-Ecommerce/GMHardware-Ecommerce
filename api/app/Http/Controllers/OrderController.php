<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Order_Items; // Importante importar o model de itens
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        // Busca apenas as ordens do usuário logado e traz os produtos junto
        $orders = Order::with(['order_items.product'])
            ->where('id_user', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();

        if ($orders->isEmpty())
            return response()->json(['message' => 'Nenhuma ordem cadastrada'], 200);
            
        return response()->json($orders, 200);
    }

    public function checkout(Request $request)
    {
        try {
            DB::beginTransaction();

            // 1. Cria a Ordem principal
            $order = Order::create([
                'id_user' => $request->user()->id,
                'total_price' => $request->total_price,
                'status' => 'pending' // Começa como pendente
            ]);

            // 2. Cria cada item da ordem (os produtos do carrinho)
            foreach ($request->items as $item) {
                Order_Items::create([
                    'id_order' => $order->id,
                    'id_product' => $item['id_product'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price']
                ]);
            }

            DB::commit();
            return response()->json(['message' => 'Pedido finalizado!', 'order' => $order], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Erro ao processar pedido: ' . $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        $data = Order::with(['order_items.product'])->find($id);
        if (empty($data))
            return response()->json(['message' => 'Nenhuma ordem encontrada'], 404);
        return response()->json($data, 200);
    }

    public function update(Request $request, $id)
    {
        $order = Order::find($id);
        if (!$order) return response()->json(['message' => 'Ordem não encontrada'], 404);
        $order->update($request->all());
        return response()->json(['message' => 'Ordem atualizada'], 200);
    }

    public function destroy($id)
    {
        $order = Order::find($id);
        if (!$order) return response()->json(['message' => 'Ordem não encontrada'], 404);
        $order->delete();
        return response()->json(['message' => 'Ordem deletada'], 200);
    }
}
