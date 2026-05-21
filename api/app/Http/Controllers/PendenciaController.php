<?php

namespace App\Http\Controllers;

use App\Models\Pendencia;
use App\Models\Predio;
use Illuminate\Http\Request;

class PendenciaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Pendencia::query();
        if($request->has("elevador_id")){
            $query = $query->where("elevador_id", $request->input("elevador_id"));
        }
        $query = $query->orderBy("created_at","desc");
        $data = $query->get();
        return response()->json($data, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $pendencia = Pendencia::create($data);
        return response()->json($pendencia, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {   
        $query = Predio::query()->where('id', $id);
        $pendencia = Pendencia::findOrFail($id);
        return response()->json($pendencia, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->all();
        $pendencia = Pendencia::findOrFail($id);
        if ($pendencia->update($data)) {
            return response()->json($pendencia, 200);
        }
        return response()->json(['message' => 'Error, update Pendencia'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $pendencia = Pendencia::findOrFail($id);
        if ($pendencia->delete()) {
            return response()->json($pendencia, 200);
        }
    }
}