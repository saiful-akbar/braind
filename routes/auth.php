<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KantorController;
use App\Http\Controllers\KomoditiController;
use App\Http\Controllers\SbpController;
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
Route::controller(KantorController::class)
    ->prefix('/kantor')
    ->name('kantor')
    ->group(function (): void {
        Route::get('/', 'index')->middleware('access:kantor,read');
        Route::get('/export', 'export')->name('.export')->middleware('access:kantor,read');
        Route::get('/create', 'create')->name('.create')->middleware('access:kantor,create');
        Route::post('/', 'store')->name('.store')->middleware('access:kantor,create');
        Route::get('/{kantor}/edit', 'edit')->name('.edit')->middleware('access:kantor,update');
        Route::patch('/{kantor}', 'update')->name('.update')->middleware('access:kantor,update');
        Route::delete('/{kantor}', 'remove')->name('.remove')->middleware('access:kantor,remove');
        Route::patch('/{kantor}/restore', 'restore')->name('.restore')->middleware('access:kantor,destroy');
        Route::delete('/{kantor}/destroy', 'destroy')->name('.destroy')->middleware('access:kantor,destroy');
    });

/**
 * Master komoditi
 */
Route::controller(KomoditiController::class)
    ->prefix('komoditi')
    ->name('komoditi')
    ->group(function (): void {
        Route::get('/', 'index')->middleware('access:komoditi,read');
        Route::post('/', 'store')->name('.store')->middleware('access:komoditi,create');
        Route::get('/export', 'export')->name('.export')->middleware('access:komoditi,read');
        Route::patch('/{komoditi}', 'update')->name('.update')->middleware('access:komoditi,update');
        Route::delete('/{komoditi}', 'remove')->name('.remove')->middleware('access:komoditi,remove');
        Route::patch('/{komoditi}/restore', 'restore')->name('.restore')->middleware('access:komoditi,destroy');
        Route::delete('/{komoditi}/destroy', 'destroy')->name('.destroy')->middleware('access:komoditi,destroy');
    });

/**
 * Master user
 */
Route::controller(UserController::class)
    ->prefix('user')
    ->name('user')
    ->group(function (): void {
        Route::get('/', 'index')->middleware('access:user,read');
        Route::get('/export', 'export')->name('.export')->middleware('access:user,read');
        Route::get('/create', 'create')->name('.create')->middleware('access:user,create');
        Route::post('/', 'store')->name('.store')->middleware('access:user,create');

        // user access
        Route::prefix('access')
            ->name('.access')
            ->group(function (): void {
                Route::get('/{user}', 'access')->middleware('access:user,create');
                Route::post('/{user}', 'storeAccess')->name('.store')->middleware('access:user,create');
                Route::get('/{user}/edit', 'editAccess')->name('.edit')->middleware('access:user,update');
                Route::put('/{user}', 'updateAccess')->name('.update')->middleware('access:user,update');
            });

        Route::get('/{user}', 'show')->name('.show')->middleware('access:user,read');
        Route::get('/{user}/edit', 'edit')->name('.edit')->middleware('access:user,update');
        Route::patch('/{user}', 'update')->name('.update')->middleware('access:user,update');
        Route::delete('/{user}', 'remove')->name('.remove')->middleware('access:user,remove');
        Route::patch('/{user}/restore', 'restore')->name('.restore')->middleware('access:user,destroy');
        Route::delete('/{user}/destroy', 'destroy')->name('.destroy')->middleware('access:user,destroy');
    });

/**
 * Master SBP
 */
Route::controller(SbpController::class)
    ->prefix('sbp')
    ->name('sbp')
    ->group(function (): void {
        Route::get('/', 'index')->middleware('access:sbp,read');
    });
