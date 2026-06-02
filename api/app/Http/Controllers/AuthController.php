<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Admin;
use App\Models\DadosCartao;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8|confirmed',
                'phone_number' => 'required|string|min:10|max:11',
                'document' => 'required|string|min:11',
                'address' => 'required|string|min:10',
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'phone_number' => $request->phone_number,
                'document' => $request->document,
                'address' => $request->address
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json(compact('user', 'token'), 201);

        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Erro interno do servidor',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);

            $user = User::where('email', $request->email)->first();
            $tipo = 'comum';

            if (!$user) {
                $user = Admin::where('email', $request->email)->first();
                $tipo = 'admin';
            }

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json(['error' => 'Credenciais inválidas'], 401);
            }

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token,
                'tipo_usuario' => $tipo
            ]);

        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Erro interno',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function updatePassword(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email|exists:users,email',
                'old_password' => 'required',
                'password' => 'required|string|min:8|confirmed',
            ]);

            $user = User::where('email', $request->email)->first();

            if (!Hash::check($request->old_password, $user->password)) {
                return response()->json([
                    'error' => 'A senha antiga está incorreta.'
                ], 401);
            }

            $user->password = Hash::make($request->password);
            $user->save();

            return response()->json([
                'message' => 'Senha alterada com sucesso!'
            ]);

        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Erro interno',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Salvar cartão
     */
    public function storeCard(Request $request)
    {
        try {
            $request->validate([
                'nome_titular' => 'required|string|max:255',
                'numero_cartao' => 'required|string',
                'vencimento' => 'required|string|max:5',
                'cvv' => 'required|string|max:4',
                'cpf' => 'required|string|max:14',
            ]);

            $temCartao = DadosCartao::where(
                'user_id',
                $request->user()->id
            )->exists();

            $cartao = DadosCartao::create([
                'user_id' => $request->user()->id,
                'nome_titular' => $request->nome_titular,
                'numero_cartao' => $request->numero_cartao,
                'vencimento' => $request->vencimento,
                'cvv' => $request->cvv,
                'cpf' => $request->cpf,
                'is_default' => !$temCartao
            ]);

            return response()->json($cartao, 201);

        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Erro ao salvar cartão',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Listar cartões
     */
    public function getCards(Request $request)
    {
        try {
            $cartoes = DadosCartao::where(
                'user_id',
                $request->user()->id
            )->get();

            return response()->json($cartoes);

        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Erro ao buscar cartões',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Excluir cartão
     */
    public function deleteCard(Request $request, $id)
    {
        try {
            $cartao = DadosCartao::where('user_id', $request->user()->id)
                ->where('id', $id)
                ->first();

            if (!$cartao) {
                return response()->json([
                    'error' => 'Cartão não encontrado'
                ], 404);
            }

            $eraPadrao = $cartao->is_default;

            $cartao->delete();

            if ($eraPadrao) {
                $proximo = DadosCartao::where('user_id', $request->user()->id)
                    ->first();

                if ($proximo) {
                    $proximo->update([
                        'is_default' => true
                    ]);
                }
            }

            return response()->json([
                'message' => 'Cartão removido com sucesso'
            ]);

        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Erro ao excluir cartão',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function makeDefaultCard(Request $request, $id)
    {
        try {
            DadosCartao::where('user_id', $request->user()->id)
                ->update(['is_default' => false]);

            $cartao = DadosCartao::where('user_id', $request->user()->id)
                ->where('id', $id)
                ->first();

            if (!$cartao) {
                return response()->json([
                    'error' => 'Cartão não encontrado'
                ], 404);
            }

            $cartao->update([
                'is_default' => true
            ]);

            return response()->json([
                'message' => 'Cartão definido como padrão'
            ]);

        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Erro ao definir cartão padrão',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'message' => 'Logout realizado com sucesso'
            ]);

        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Erro ao fazer logout',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}