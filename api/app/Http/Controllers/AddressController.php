<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;

class AddressController extends Controller {
    public function index(Request $request) {
        return response()->json(Address::where('user_id', $request->user()->id)->get(), 200);
    }

    public function store(Request $request) {
        $data = $request->all();
        $data['user_id'] = $request->user()->id;
        $address = Address::create($data);
        return response()->json($address, 201);
    }

    public function update(Request $request, $id) {
        $address = Address::where('id', $id)->where('user_id', $request->user()->id)->firstOrFail();
        $address->update($request->all());
        return response()->json($address, 200);
    }

    public function destroy(Request $request, $id) {
        $address = Address::where('id', $id)->where('user_id', $request->user()->id)->firstOrFail();
        $address->delete();
        return response()->json(null, 204);
    }
}
