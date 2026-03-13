<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();
        return response()->json($categories, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return response()->json(['message' => 'create category'], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $category = Category::create($data);
        return response()->json($category, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        $data = Category::find($category->id);
        if (empty($data))
            return response()->json(['message' => 'Item não encontrado'], 204);
        return response()->json($data, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return response()->json(['message' => 'edit category'], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $data = $request->all();
        if (empty($data))
            return response()->json(['message' => 'Categoria não encontrada'], 204);
        $category->update($data);
        return response()->json($category, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $data = Category::find($category->id);
        if (empty($data))
            return response()->json(['message' => 'Categoria não encontrada'], 204);
        $category->delete();
        return response()->json(['message' => "A categoria $data[name] foi Deletada"], 200);
    }
}
