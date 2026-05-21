<?php

namespace App\Http\Controllers;

use App\Models\Predio;
use Illuminate\Http\Request;

class PredioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Predio::query();
        if($request->has("include")){
            $relacoes = explode(",", $request->input("include"));
            $permitidas = ['elevadores', 'elevadores.pendencia'];
            $incluir = array_intersect($relacoes, $permitidas);
            $query->with($incluir);
        }
        $predio = $query->get();
        return response()->json($predio, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $predio = Predio::create($data);
        return response()->json($predio->id, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {
        $query = Predio::where('id', $id);
        if($request->has('include')){
            $relacores = explode(',', $request->input('include'));
            $permitidas = ['elevadores', 'elevadores.pendencia'];
            $incluir = array_intersect($relacores, $permitidas);
            $query->with($incluir);
        }
        $predio = $query->firstOrFail();
        return response()->json($predio, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->all();
        $predio = Predio::findOrFail($id);
        if ($predio->update($data)) {
            return response()->json($predio, 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $predio = Predio::findOrFail($id);
        if ( $predio->delete()) {
            return response()->json($predio, 200);
        }
    }
}
