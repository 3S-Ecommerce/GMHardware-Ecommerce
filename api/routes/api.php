<?php

use Illuminate\Http\Request;
use App\Http\Controllers\ElevadorController;
use App\Http\Controllers\PendenciaController;
use App\Http\Controllers\PredioController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::apiResource('user', UserController::class); 

Route::apiResource('pendencia', PendenciaController::class);

Route::apiResource('predio', PredioController::class);

Route::apiResource('elevador', ElevadorController::class);