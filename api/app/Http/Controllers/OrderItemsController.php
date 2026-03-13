<?php

namespace App\Http\Controllers;

use App\Models\Order_Items;
use Illuminate\Http\Request;

class OrderItemsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orderItems = Order_Items::all();
        if ($orderItems->isEmpty()) 
            return response()->json(['message' => 'Nenhuma Order Item encontrada'], 200);
        return response()->json($orderItems, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return response()->json(['message' => 'create order items'], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $orderItems = Order_Items::create($data);
        return response()->json($orderItems, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $data = Order_Items::find($id);
        if (empty($data))
            return response()->json(['message' => 'Order Item não encontrada'], 404);
        return response()->json($data, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order_Items $order_Items)
    {
        return response()->json(['message' => 'edit order items'], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order_Items $order_item)
    {
        $data = $request->all();
        if (empty($data))
            return response()->json(['message' => 'Order Item não sencontrada'], 200);
        $order_item->update($data);
        return response()->json($order_item, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order_Items $order_item)
    {
        $data = Order_Items::find( $order_item->id );
        // if (empty($data))
        //     return response()->json(['message' => 'Nenhuma ordem Items para exclusão'], 200);
        $order_item->delete();
        return response()->json(['message' => "O item $data->name foi deletado"], 200);
    }
}
