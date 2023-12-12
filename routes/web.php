<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DivisionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;

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

/**
 * Route untuk user yang belum login
 */
Route::middleware('guest')->group(function (): void {

    // Login
    Route::controller(AuthController::class)
        ->prefix('/login')
        ->name('login')
        ->group(function (): void {
            Route::get('/', 'login');
            Route::post('/', 'store')->name('.store');
        });
});

/**
 * Route untuk user yang sudah login
 */
Route::middleware('auth')->group(function (): void {

    // Logout
    Route::controller(AuthController::class)
        ->prefix('/logout')
        ->name('logout')
        ->group(function (): void {
            Route::delete('/', 'logout');
        });

    // Dashboard
    Route::controller(DashboardController::class)
        ->name('dashboard')
        ->group(function (): void {
            Route::get('/', 'index');
        });

    // Division
    Route::controller(DivisionController::class)
        ->prefix('/division')
        ->name('division')
        ->group(function (): void {
            Route::get('/', 'index')->middleware('access:division,read');
            Route::get('/create', 'create')->name('.create')->middleware('access:division,create');
            Route::post('/', 'store')->name('.store')->middleware('access:division,create');
            Route::get('/{division}/edit', 'edit')->name('.edit')->middleware('access:division,update');
            Route::patch('/{division}', 'update')->name('.update')->middleware('access:division,update');
            Route::delete('/{division}', 'remove')->name('.remove')->middleware('access:division,remove');
            Route::delete('/{division}/destroy', 'destroy')->name('.destroy')->middleware('access:division,destroy');
        });

    Route::get('/commodity', fn () => inertia('Dashboard/index'))->name('commodity');
    Route::get('/sbp', fn () => inertia('Dashboard/index'))->name('sbp');
    Route::get('/user', fn () => inertia('User/index'))->name('user');
});
