<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $admins = Admin::all();
        return response()->json($admins, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return response()->json(['message' => 'create admin'], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        if (!empty($request['password'])) 
            $data['password'] = bcrypt($request['password']);
        $admin = Admin::create($data);
        return response()->json($admin, 200);

    }

    /**
     * Display the specified resource.
     */
    public function show(Admin $admin)
    {
        $data = Admin::find($admin->id);
        return response()->json($data, 200);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Admin $admin)
    {
        return response()->json(['message' => 'edit admin'], 200);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Admin $admin)
    {
        $data = $request->all();
        if (!empty($request['password']))
            $data['password'] = bcrypt($request['password']);
        $admin->update($data);
        return response()->json($admin, 200);

    }
    public function destroy(Admin $admin)
    {
        $data = Admin::find($admin->id);
        $admin->delete();
        return response()->json(['message' => "O administrador $data[name] foi deletado!"], 200);
    }
}
