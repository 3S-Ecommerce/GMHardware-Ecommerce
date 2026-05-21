<?php

namespace App\Http\Controllers;

use App\Models\Elevador;
use Illuminate\Http\Request;

class ElevadorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Elevador::query();
        if ($request->has("include")) {
            $relacoes = explode(",", $request->input("include"));
            $permitidas = ['predio', 'pendencia'];
            $incluir = array_intersect($relacoes, $permitidas);
            $query->with($incluir);
        }
        $response = $query->get();
        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $elevador = Elevador::create($data);
        return response()->json($elevador, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {
        $query = Elevador::where('id', $id);
        if ($request->has('include')) {
            $relacoes = explode(',', $request->input('include'));
            $permitidas = ['predio','pendencia'];
            $incluir = array_intersect($relacoes, $permitidas);
            $query->with($incluir);
        }
        $response = $query->firstOrFail();
        return response()->json($response, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $data = $request->all();
        $elevador = Elevador::findOrFail($id);
        if ($elevador->update($data)) {
            return response()->json($elevador, 200);
        }
        return response()->json(['message' => 'Error, update Elevador']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $elevador = Elevador::findOrFail($id);
        if ($elevador->delete()) {
            return response()->json($elevador, 200);
        }
        return response()->json(['message' => 'Error, destroy Elevador']);
    }
}
