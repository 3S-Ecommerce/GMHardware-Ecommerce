<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Order_Items;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = Order::with(['order_items.product'])
            ->where('id_user', $request->user()->id)
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
            ]);

            DB::beginTransaction();

            $order = Order::create([
                'id_user' => $request->user()->id,
                'total_price' => $request->total_price,
                'status' => 'Pedido realizado'
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

            $order->load(['order_items.product']);

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
        $order = Order::with(['order_items.product'])
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