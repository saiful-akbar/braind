<?php

use App\Http\Controllers\AuthController;
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

Route::get('/', function () {
    return Inertia::render('Dashboard/Index');
});

// Route untuk user yang belum login
Route::middleware('guest')->group(function(): void {
    
    // Login
    Route::controller(AuthController::class)
        ->prefix('/login')
        ->name('login')
        ->group(function(): void {
            Route::get('/', 'login');
            Route::post('/', 'store')->name('.store');
        });
});

// Route untuk user yang sudah login
Route::middleware('auth')->group(function(): void {
    
    // Logout
    Route::controller(AuthController::class)
        ->prefix('/logout')
        ->name('logout')
        ->group(function(): void {
            Route::delete('/', 'logout');
        });
});
