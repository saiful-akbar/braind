<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommodityController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DivisionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


/**
 * Logout
 */
Route::controller(AuthController::class)
    ->prefix('/logout')
    ->name('logout')
    ->group(function (): void {
        Route::delete('/', 'logout');
    });

/**
 * Dashboard
 */
Route::controller(DashboardController::class)
    ->name('dashboard')
    ->group(function (): void {
        Route::get('/', 'index');
    });

/**
 * Master division (kanwil)
 */
Route::controller(DivisionController::class)
    ->prefix('/division')
    ->name('division')
    ->group(function (): void {
        Route::get('/', 'index')->middleware('access:division,read');
        Route::get('/export', 'export')->name('.export')->middleware('access:division,read');
        Route::get('/create', 'create')->name('.create')->middleware('access:division,create');
        Route::post('/', 'store')->name('.store')->middleware('access:division,create');
        Route::get('/{division}/edit', 'edit')->name('.edit')->middleware('access:division,update');
        Route::patch('/{division}', 'update')->name('.update')->middleware('access:division,update');
        Route::delete('/{division}', 'remove')->name('.remove')->middleware('access:division,remove');
        Route::patch('/{division}/restore', 'restore')->name('.restore')->middleware('access:division,destroy');
        Route::delete('/{division}/destroy', 'destroy')->name('.destroy')->middleware('access:division,destroy');
    });

/**
 * Master commodity
 */
Route::controller(CommodityController::class)
    ->name('commodity')
    ->prefix('commodity')
    ->group(function (): void {
        Route::get('/', 'index')->middleware('access:commodity,read');
        Route::post('/', 'store')->name('.store')->middleware('access:commodity,create');
        Route::get('/export', 'export')->name('.export')->middleware('access:commodity,read');
        Route::patch('/{commodity}', 'update')->name('.update')->middleware('access:commodity,update');
        Route::delete('/{commodity}', 'remove')->name('.remove')->middleware('access:commodity,remove');
        Route::patch('/{commodity}/restore', 'restore')->name('.restore')->middleware('access:commodity,destroy');
        Route::delete('/{commodity}/destroy', 'destroy')->name('.destroy')->middleware('access:commodity,destroy');
    });

/**
 * Master user
 */
Route::controller(UserController::class)
    ->name('user')
    ->prefix('user')
    ->group(function (): void {
        Route::get('/', 'index')->middleware('access:user,read');
        Route::get('/export', 'export')->name('.export')->middleware('access:user,read');
        Route::get('/create', 'create')->name('.create')->middleware('access:user,create');
        Route::post('/', 'store')->name('.store')->middleware('access:user,create');
        Route::get('/{user}/edit', 'edit')->name('.edit')->middleware('access:user,update');
        Route::patch('/{user}', 'update')->name('.update')->middleware('access:user,update');
        Route::delete('/{user}', 'remove')->name('.remove')->middleware('access:user,remove');
        Route::patch('/{user}/restore', 'restore')->name('.restore')->middleware('access:user,destroy');
        Route::delete('/{user}/destroy', 'destroy')->name('.destroy')->middleware('access:user,destroy');
    });

Route::get('/sbp', fn () => inertia('Dashboard/index'))->name('sbp');
