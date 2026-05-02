<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            // 1. Adicionar validação dos dados de entrada
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8|confirmed',
            ]);

            // 2. Hash da senha antes de criar o usuário
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            // Gerar token para o usuário recém-registrado
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json(compact('user', 'token'), 201); // Retorna 201 Created

        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422); // Erro de validação
        } catch (\Throwable $e) {
            // 3. Remover dd() e retornar uma resposta de erro JSON
            return response()->json(['error' => 'Erro interno do servidor', 'message' => $e->getMessage()], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            // 1. Adicionar validação para os dados de login
            $request->validate([
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);

            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json(['error' => 'Credenciais inválidas'], 401);
            }

            // 2. Garantir que Sanctum está configurado e migrado
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json(compact('user', 'token'));

        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422); // Erro de validação
        } catch (\Throwable $e) {
            // 3. Remover dd() e retornar uma resposta de erro JSON
            return response()->json(['error' => 'Erro interno do servidor', 'message' => $e->getMessage()], 500);
        }
    }

    public function updatePassword(Request $request)
{
    try {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'old_password' => 'required',
            'password' => 'required|string|min:8|confirmed', // 'password_confirmation' no envio
        ]);

        $user = User::where('email', $request->email)->first();

        // Verifica se a senha antiga está correta
        if (!Hash::check($request->old_password, $user->password)) {
            return response()->json(['error' => 'A senha antiga está incorreta.'], 401);
        }

        // Atualiza para a nova senha
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json(['message' => 'Senha alterada com sucesso!']);

    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json(['errors' => $e->errors()], 422);
    } catch (\Throwable $e) {
        return response()->json(['error' => 'Erro interno', 'message' => $e->getMessage()], 500);
    }
}
}
