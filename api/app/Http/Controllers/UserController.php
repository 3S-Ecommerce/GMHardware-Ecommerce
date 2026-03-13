<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return response()->json(['message' => 'create user'], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        if (!empty($request['password']))
            $data['password'] = bcrypt($request['password']);
        $user = User::create($data);
        return response()->json($user, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $data = User::find( $user->id );
        return response()->json($data, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return response()->json(['message' => 'edit user'], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $data = $request->all();
        if (!empty($request['password']))
            $data['password'] = bcrypt( $request['password']);
        $user->update($data);
        return response()->json($user, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $data = User::find($user->id);
        $user->delete();
        return response()->json(['message' => "O usuario $data[name] foi deletado!"], 200);
    }
}
