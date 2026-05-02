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
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8|confirmed',
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'phone_number' => $request->phone_number,
                'document' => $request->document,
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json(compact('user', 'token'), 201);

        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Throwable $e) {
            return response()->json(['error' => 'Erro interno do servidor', 'message' => $e->getMessage()], 500);
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

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json(['error' => 'Credenciais inválidas'], 401);
            }

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json(compact('user', 'token'));

        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Throwable $e) {
            return response()->json(['error' => 'Erro interno do servidor', 'message' => $e->getMessage()], 500);
        }
    }

    // NOVO MÉTODO: updatePassword
    public function updatePassword(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email|exists:users,email',
                'old_password' => 'required',
                'password' => 'required|string|min:8|confirmed',
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

        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Throwable $e) {
            return response()->json(['error' => 'Erro interno', 'message' => $e->getMessage()], 500);
        }
    }
}
