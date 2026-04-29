<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
public function register(Request $request)
{
    try {

        dd($request->all());

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
        ]);

        return response()->json($user);

    } catch (\Throwable $e) {
        dd($e->getMessage());
    }
}
    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Credenciais inválidas'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(compact('user', 'token'));
    }
}