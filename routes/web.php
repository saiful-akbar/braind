<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SbpController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\KantorController;
use App\Http\Controllers\KomoditiController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PerusahaanHtHptlController;
use App\Http\Controllers\PerusahaanMmeaController;

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

/**
 * Login route
 */
Route::middleware('guest')->group(function (): void {
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

    /**
     * Logout
     */
    Route::controller(AuthController::class)
        ->name('logout')
        ->prefix('/logout')
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
        ->name('kantor')
        ->prefix('/kantor')
        ->group(function (): void {
            Route::get('/', 'index')->middleware('access:kantor,read');
            Route::get('/get', 'get')->name('.get');
            Route::get('/export', 'export')->name('.export')->middleware('access:kantor,read');
            Route::post('/', 'store')->name('.store')->middleware('access:kantor,create');
            Route::patch('/{kantor}', 'update')->name('.update')->middleware('access:kantor,update');
            Route::patch('/{kantor}/restore', 'restore')->name('.restore')->middleware('access:kantor,destroy');
            Route::delete('/{kantor}', 'remove')->name('.remove')->middleware('access:kantor,remove');
            Route::delete('/{kantor}/destroy', 'destroy')->name('.destroy')->middleware('access:kantor,destroy');
            Route::prefix('/import')->name('.import')->group(function (): void {
                Route::post('/', 'import')->middleware('access:kantor,create');
                Route::get('/template', 'downloadTemplate')->name('.template')->middleware('access:kantor,create');
            });
        });

    /**
     * Master komoditi
     */
    Route::controller(KomoditiController::class)
        ->name('komoditi')
        ->prefix('/komoditi')
        ->group(function (): void {
            Route::get('/', 'index')->middleware('access:komoditi,read');
            Route::post('/', 'store')->name('.store')->middleware('access:komoditi,create');
            Route::get('/export', 'export')->name('.export')->middleware('access:komoditi,read');
            Route::patch('/{komoditi}', 'update')->name('.update')->middleware('access:komoditi,update');
            Route::delete('/{komoditi}', 'remove')->name('.remove')->middleware('access:komoditi,remove');
            Route::patch('/{komoditi}/restore', 'restore')->name('.restore')->middleware('access:komoditi,destroy');
            Route::delete('/{komoditi}/destroy', 'destroy')->name('.destroy')->middleware('access:komoditi,destroy');

            Route::prefix('/import')->name('.import')->group(function (): void {
                Route::post('/', 'import')->middleware('access:komoditi,create');
                Route::get('/template', 'downloadTemplate')->name('.template')->middleware('access:komoditi,create');
            });
        });

    /**
     * Master user
     */
    Route::controller(UserController::class)
        ->name('user')
        ->prefix('/user')
        ->group(function (): void {
            Route::get('/', 'index')->middleware('access:user,read');
            Route::get('/export', 'export')->name('.export')->middleware('access:user,read');
            Route::get('/create', 'create')->name('.create')->middleware('access:user,create');
            Route::post('/', 'store')->name('.store')->middleware('access:user,create');

            // user access
            Route::name('.access')
                ->prefix('/access')
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
        ->name('sbp')
        ->prefix('/sbp')
        ->group(function (): void {
            Route::get('/', 'index')->middleware('access:sbp,read');
            Route::post('/store', 'store')->name('.store')->middleware('access:sbp,create');
            Route::get('/export', 'export')->name('.export')->middleware('access:sbp,read');
            Route::patch('/{sbp}', 'update')->name('.update')->middleware('access:sbp,update');
            Route::delete('/{sbp}', 'remove')->name('.remove')->middleware('access:sbp,remove');
            Route::patch('/{sbp}/restore', 'restore')->name('.restore')->middleware('access:sbp,destroy');
            Route::delete('/{sbp}/destroy', 'destroy')->name('.destroy')->middleware('access:sbp,destroy');

            Route::prefix('/import')
                ->name('.import')
                ->group(function (): void {
                    Route::post('/', 'import')->middleware('access:sbp,create');
                    Route::get('/template', 'downloadTemplate')->name('.template')->middleware('access:sbp,create');
                });
        });

    /**
     * perusahaan HT + HPTL
     */
    Route::controller(PerusahaanHtHptlController::class)
        ->name('perusahaan.hthptl')
        ->prefix('/perusahaan/ht-hptl')
        ->group(function (): void {
            Route::get('/', 'index')->middleware('access:perusahaan.hthptl,read');
            Route::get('/create', 'create')->name('.create')->middleware('access:perusahaan.hthptl,create');
            Route::get('/export', 'export')->name('.export')->middleware('access:perusahaan.hthptl,read');
            Route::post('/', 'store')->name('.store')->middleware('access:perusahaan.hthptl,create');
            Route::patch('/{id}', 'update')->name('.update')->middleware('access:perusahaan.hthptl,update');
            Route::delete('/{id}', 'remove')->name('.remove')->middleware('access:perusahaan.hthptl,remove');
            Route::delete('/{id}/destroy', 'destroy')->name('.destroy')->middleware('access:perusahaan.hthptl,destroy');
            Route::patch('/{id}/restore', 'restore')->name('.restore')->middleware('access:perusahaan.hthptl,destroy');

            Route::prefix('/import')->name('.import')->group(function (): void {
                Route::post('/', 'import')->middleware('access:perusahaan.hthptl,create');
                Route::get('/template', 'downloadTemplate')->name('.template')->middleware('access:perusahaan.hthptl,create');
            });
        });

    /**
     * Perusahaan Cukai MMEA
     */
    Route::controller(PerusahaanMmeaController::class)
        ->name('perusahaan.mmea')
        ->prefix('/perusahaan/mmea')
        ->group(function (): void {
            Route::get('/', 'index')->middleware('access:perusahaan.mmea,read');
            Route::post('/', 'store')->name('.store')->middleware('access:perusahaan.mmea,create');
        });


    Route::get('/perusahaan/ekspor', [DashboardController::class, 'index'])->name('perusahaan.ekspor');
    Route::get('/perusahaan/impor', [DashboardController::class, 'index'])->name('perusahaan.impor');
});
