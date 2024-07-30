<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ApiGempaController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BantuanController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DataGempaController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware(['guest'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    })->name('home');

    Route::post('login', [AuthController::class, 'login'])->name('login');
    Route::post('register', [AuthController::class, 'register'])->name('register');
});
Route::get('logout', [AuthController::class, 'logout'])->name('logout');

Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

Route::get('data-admin', [AdminController::class, 'index'])->name('data-admin');
Route::delete('data-admin-delete', [AdminController::class, 'destroy'])->name('data-admin.destroy');
Route::post('data-admin-create', [AdminController::class, 'create'])->name('data-admin.create');

Route::get('data-gempa', [DataGempaController::class, 'index'])->name('data-gempa');
Route::get('data-permintaan-bantuan', [BantuanController::class, 'index'])->name('data-permintaan-bantuan');

Route::get('api/get-peringatan-gempa', [ApiGempaController::class, 'getPeringatanGempa']);
Route::get('api/get-data', [ApiGempaController::class, 'index'])->name('index');
Route::get('api/get-data-bantuan', [ApiGempaController::class, 'bantuan'])->name('bantuan');
