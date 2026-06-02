<?php

namespace App\Http\Controllers;

use App\Models\Endereco;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    // Listar endereços do usuário
    public function index(Request $request)
    {
        return response()->json(
            Endereco::where('user_id', $request->user()->id)->get(),
            200
        );
    }

    // Cadastrar endereço
    public function store(Request $request)
    {
        $data = $request->all();
        $data['user_id'] = $request->user()->id;

        // Verifica se já existe endereço
        $hasAddress = Endereco::where('user_id', $request->user()->id)->exists();

        // Primeiro endereço vira padrão
        $data['padrao'] = !$hasAddress;

        $address = Endereco::create($data);

        return response()->json($address, 201);
    }

    // Atualizar endereço
    public function update(Request $request, $id)
    {
        $address = Endereco::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $address->update($request->all());

        return response()->json($address, 200);
    }

    // Tornar endereço padrão
    public function makeDefault(Request $request, $id)
    {
        $address = Endereco::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        // Remove padrão dos outros
        Endereco::where('user_id', $request->user()->id)
            ->update(['padrao' => 0]);

        // Define o selecionado
        $address->update(['padrao' => 1]);

        return response()->json([
            'message' => 'Endereço padrão atualizado com sucesso'
        ], 200);
    }

    // Excluir endereço
    public function destroy(Request $request, $id)
    {
        $address = Endereco::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $wasDefault = $address->padrao;
        $userId = $address->user_id;

        $address->delete();

        // Se apagou o padrão, define outro
        if ($wasDefault) {
            $nextAddress = Endereco::where('user_id', $userId)->first();

            if ($nextAddress) {
                $nextAddress->update(['padrao' => 1]);
            }
        }

        return response()->json(null, 204);
    }
}