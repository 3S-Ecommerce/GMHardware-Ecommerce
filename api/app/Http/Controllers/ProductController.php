<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all();
        return response()->json($products, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return response()->json(['message' => 'create product'], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('product', 'public');
            $data['image'] = $path;
        }
        $product = Product::create($data);
        return response()->json($product, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product    $product)
    {
        $data = Product::find($product);
        if (empty($data))
            return response()->json(['message' => 'não exite esse'], 204);
        return response()->json($data, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return response()->json(['message' => 'edit product'], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $data = $request->all();
        if (empty($data))
            return response()->json(null, 404);
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $path = $request->file('image')->store('product', 'public');
            $data['image'] = $path;
        }
        $product->update($data);
        return response()->json($product, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $data = Product::find($product->id);
        if (empty($data))
            return response()->json(null, 404);
        return response()->json(['message' => 'destroy product'], 200);
    }
}
