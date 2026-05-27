<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemsController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PaymentController;


// Rota de busca de produtos - DEVE VIR ANTES do Route::apiResource("product")
Route::get("/products/search", [ProductController::class, "search"]);

Route::apiResource("user", UserController::class);

Route::apiResource("admin", AdminController::class);

Route::apiResource("order" , OrderController::class);

Route::apiResource("category", CategoryController::class);

Route::apiResource("product", ProductController::class);

Route::apiResource("order-items", OrderItemsController::class);

Route::post('/pix', [PaymentController::class, 'createPixPayment']);
// Route::get('/user/{id}', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::apiResource('user', UserController::class);

Route::apiResource('admin', AdminController::class);

Route::apiResource('order' , OrderController::class);

Route::apiResource('category', CategoryController::class);

Route::apiResource('product', ProductController::class);

Route::apiResource('order-items', OrderItemsController::class);

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::post('/update-password', [AuthController::class, 'updatePassword']);

Route::post('/salvar-cartao', [AuthController::class, 'storeCard'])->middleware('auth:sanctum');

