<?php

namespace App\Http\Controllers;

use App\Models\Endereco;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    public function index(Request $request)
    {
        $enderecos = Endereco::where('user_id', $request->user()->id)
            ->orderByDesc('padrao')
            ->orderBy('id')
            ->get();

        return response()->json($enderecos, 200);
    }

    public function show(Request $request, $id)
    {
        $endereco = Endereco::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        return response()->json($endereco, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'zip_code' => 'required|string|max:20',
            'street' => 'required|string|max:255',
            'number' => 'required|string|max:50',
            'city' => 'required|string|max:255',
        ]);

        $hasAddress = Endereco::where('user_id', $request->user()->id)->exists();

        $address = Endereco::create([
            'user_id' => $request->user()->id,
            'zip_code' => $request->zip_code,
            'street' => $request->street,
            'number' => $request->number,
            'city' => $request->city,
            'padrao' => !$hasAddress
        ]);

        return response()->json($address, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'zip_code' => 'required|string|max:20',
            'street' => 'required|string|max:255',
            'number' => 'required|string|max:50',
            'city' => 'required|string|max:255',
        ]);

        $address = Endereco::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $address->update([
            'zip_code' => $request->zip_code,
            'street' => $request->street,
            'number' => $request->number,
            'city' => $request->city,
        ]);

        return response()->json($address, 200);
    }

    public function makeDefault(Request $request, $id)
    {
        $address = Endereco::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        Endereco::where('user_id', $request->user()->id)
            ->update(['padrao' => 0]);

        $address->update(['padrao' => 1]);

        return response()->json([
            'message' => 'Endereço padrão atualizado com sucesso'
        ], 200);
    }

    public function destroy(Request $request, $id)
    {
        $address = Endereco::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $wasDefault = $address->padrao;
        $userId = $address->user_id;

        $address->delete();

        if ($wasDefault) {
            $nextAddress = Endereco::where('user_id', $userId)
                ->orderBy('id')
                ->first();

            if ($nextAddress) {
                $nextAddress->update([
                    'padrao' => 1
                ]);
            }
        }

        return response()->json(null, 204);
    }
}