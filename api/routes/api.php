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
use App\Http\Controllers\AddressController;


// Rota de busca de produtos - DEVE VIR ANTES do Route::apiResource("product")
Route::get("/products/search", [ProductController::class, "search"]);

Route::post('/pix', [PaymentController::class, 'createPixPayment']);

// Route::get('/user/{id}', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::apiResource('user', UserController::class);

Route::apiResource('admin', AdminController::class);

Route::apiResource('order' , OrderController::class)
    ->middleware('auth:sanctum');
Route::apiResource('category', CategoryController::class);

Route::apiResource('product', ProductController::class);
Route::post('/product/{id}', [ProductController::class, 'update']);

Route::apiResource('order-items', OrderItemsController::class);

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::post('/update-password', [AuthController::class, 'updatePassword']);

Route::post('/logout', [AuthController::class, 'logout'])
    ->middleware('auth:sanctum');

Route::post('/salvar-cartao', [AuthController::class, 'storeCard'])
    ->middleware('auth:sanctum');

Route::get('/meus-cartoes', [AuthController::class, 'getCards'])
    ->middleware('auth:sanctum');

Route::delete('/salvar-cartao/{id}', [AuthController::class, 'deleteCard'])
    ->middleware('auth:sanctum');

Route::put('/cartoes/{id}/default', [AuthController::class, 'makeDefaultCard'])
    ->middleware('auth:sanctum');

Route::apiResource('addresses', AddressController::class)
    ->middleware('auth:sanctum');

Route::post('/orders/checkout', [OrderController::class, 'checkout'])
    ->middleware('auth:sanctum');

Route::put('/addresses/{id}/default', [AddressController::class, 'makeDefault'])
    ->middleware('auth:sanctum');

Route::apiResource('addresses', AddressController::class)
    ->middleware('auth:sanctum');

Route::post('/order/qrcode', [OrderController::class, 'gerarQrCode']);