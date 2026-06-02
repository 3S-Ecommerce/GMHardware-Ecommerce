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
        $products = Product::with(['category'])->get();
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
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'id_category' => 'required|exists:categories,id',
            'stock' => 'required|integer'
        ]);

        $data = $request->all();

        // 💡 Loop para varrer e salvar os 5 campos de imagem dinamicamente
        for ($i = 1; $i <= 5; $i++) {
            $inputName = $i === 1 ? 'image' : "image_$i";

            if ($request->hasFile($inputName)) {
                $path = $request->file($inputName)->store('product', 's3');
                $data[$inputName] = $path;
            }
        }

        $product = Product::create($data);
        return response()->json($product, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $data = Product::find($product->id);
        if (empty($data)) {
            return response()->json(['message' => 'não existe esse'], 204);
        }
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

    public function update(Request $request, $id)
    {
        // 💡 Busca o produto explicitamente pelo ID enviado na URL para evitar falhas de mapeamento
        $product = Product::findOrFail($id);

        $data = $request->all();
        if (empty($data)) {
            return response()->json(["message" => "Dados vazios enviados"], 400);
        }

        // 💡 Loop para atualizar as 5 imagens salvando no Cloudflare R2 com segurança
        foreach (['image', 'image_2', 'image_3', 'image_4', 'image_5'] as $inputName) {
            if ($request->hasFile($inputName) && $request->file($inputName)->isValid()) {

                // 💡 Tenta deletar a imagem antiga do Cloudflare, se ela existir, sem quebrar a API
                if ($product->$inputName) {
                    try {
                        if (Storage::disk('s3')->exists($product->$inputName)) {
                            Storage::disk('s3')->delete($product->$inputName);
                        }
                    } catch (\Exception $e) {
                        // Apenas ignora o erro caso o arquivo antigo não seja encontrado no bucket
                    }
                }

                try {
                    // 💡 Salva a nova imagem usando 'putFile' (método compatível com as travas do R2)
                    $path = Storage::disk('s3')->putFile('product', $request->file($inputName));
                    $data[$inputName] = $path;
                } catch (\Exception $e) {
                    // Retorna um erro amigável se o upload falhar por falta do driver ou chaves incorretas
                    return response()->json([
                        "message" => "Erro ao fazer upload da imagem ($inputName) para o Cloudflare R2.",
                        "error" => $e->getMessage()
                    ], 500);
                }
            }
        }

        // Atualiza os dados textuais e os novos caminhos das imagens no banco Supabase
        $product->update($data);
        
        return response()->json($product, 200);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $data = Product::find($product->id);
        if (empty($data)) {
            return response()->json(null, 404);
        }
        return response()->json(['message' => 'destroy product'], 200);
    }

    /**
     * Search products by name.
     */
    public function search(Request $request)
    {
        $query = $request->input('q');

        if (empty($query)) {
            return response()->json([]);
        }

        $products = Product::where('name', 'LIKE', "%{$query}%")
            ->select('id', 'name', 'price', 'image')
            ->take(5)
            ->get();

        return response()->json($products);
    }
}