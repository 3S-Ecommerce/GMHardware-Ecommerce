<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemsController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('user', UserController::class);

Route::apiResource('admin', AdminController::class);

Route::apiResource('order' , OrderController::class);

Route::apiResource('category', CategoryController::class);

Route::apiResource('product', ProductController::class);

Route::apiResource('orderItems', OrderItemsController::class);