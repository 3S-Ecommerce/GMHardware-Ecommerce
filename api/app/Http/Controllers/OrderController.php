<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::all();
        if (empty($orders))
            return response()->json(['message' => 'Nenhuma ordem cadastrada'], 200);
        return response()->json(['message' => 'index order'], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return response()->json(['message' => 'create order'], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        if (empty($data))
            return response()->json(['message' => 'Nenhum dado para cadastro'], 200);
        $order = Order::create($data);
        return response()->json($order, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $data = Order::find( $order->id );
        if (empty($data))
            return response()->json(['message' => 'Nenhuma ordem encontrada'], 200);
        return response()->json($data, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        return response()->json(['message' => 'edit order'], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        $data = $request->all();
        if (empty($data))
            return response()->json(['message' => 'Nenhum dado para atualizar'], 200);
        $order->update($data);
        return response()->json(['message' => 'update order'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        return response()->json(['message' => 'destroy order'], 200);
    }
}
