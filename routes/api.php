<?php

use App\Http\Controllers\ApiGempaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('kirim-data-gempa', [ApiGempaController::class, 'store']);
Route::post('konek-perangkat', [ApiGempaController::class, 'konekPerangkat']);
Route::post('minta-bantuan', [ApiGempaController::class, 'minta_bantuan']);
