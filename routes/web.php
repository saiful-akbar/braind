<?php

use App\Models\OperasiAlatPemindai;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SbpController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\KantorController;
use App\Http\Controllers\KomoditiController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PenerimaanController;
use App\Http\Controllers\PengawasanController;
use App\Http\Controllers\PenindakanController;
use App\Http\Controllers\PerusahaanController;
use App\Http\Controllers\PerusahaanMmeaController;
use App\Http\Controllers\PerusahaanExportController;
use App\Http\Controllers\PerusahaanHtHptlController;
use App\Http\Controllers\PerusahaanImportController;
use App\Http\Controllers\OperasiAlatPemindaiController;

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
            Route::get('/json', 'json')->name('.json');
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
            Route::get('/json', 'json')->name('.json');
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
     * Master perusahaan
     */
    Route::controller(PerusahaanController::class)
        ->name('master-perusahaan')
        ->prefix('/master-perusahaan')
        ->group(function (): void {
            Route::get('/', 'index')->middleware('access:master-perusahaan,read');
            Route::post('/', 'store')->name('.store')->middleware('access:master-perusahaan,create');
            Route::patch('/{perusahaan}', 'update')->name('.update')->middleware('access:master-perusahaan,update');
            Route::delete('/{perusahaan}', 'remove')->name('.remove')->middleware('access:master-perusahaan,remove');
            Route::patch('/{perusahaan}/restore', 'restore')->name('.restore')->middleware('access:master-perusahaan,destroy');
            Route::delete('/{perusahaan}/destroy', 'destroy')->name('.destroy')->middleware('access:master-perusahaan,destroy');
            Route::get('/export', 'export')->name('.export')->middleware('access:master-perusahaan,read');

            Route::name('.import')
                ->prefix('/import')
                ->group(function (): void {
                    Route::post('/', 'import')->middleware('access:master-perusahaan,create');
                    Route::get('/template', 'downloadTemplate')->name('.template')->middleware('access:master-perusahaan,create');
                });

            Route::get('/json', 'json')->name('.json');
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
        ->name('perusahaan-hthptl')
        ->prefix('/perusahaan-hthptl')
        ->group(function (): void {
            Route::get('/', 'index')->middleware('access:perusahaan-hthptl,read');
            Route::get('/create', 'create')->name('.create')->middleware('access:perusahaan-hthptl,create');
            Route::get('/export', 'export')->name('.export')->middleware('access:perusahaan-hthptl,read');
            Route::post('/', 'store')->name('.store')->middleware('access:perusahaan-hthptl,create');
            Route::patch('/{id}', 'update')->name('.update')->middleware('access:perusahaan-hthptl,update');
            Route::delete('/{id}', 'remove')->name('.remove')->middleware('access:perusahaan-hthptl,remove');
            Route::delete('/{id}/destroy', 'destroy')->name('.destroy')->middleware('access:perusahaan-hthptl,destroy');
            Route::patch('/{id}/restore', 'restore')->name('.restore')->middleware('access:perusahaan-hthptl,destroy');

            Route::prefix('/import')->name('.import')->group(function (): void {
                Route::post('/', 'import')->middleware('access:perusahaan-hthptl,create');
                Route::get('/template', 'downloadTemplate')->name('.template')->middleware('access:perusahaan-hthptl,create');
            });
        });

    /**
     * Perusahaan Cukai MMEA
     */
    Route::controller(PerusahaanMmeaController::class)
        ->name('perusahaan-mmea')
        ->prefix('/perusahaan-mmea')
        ->group(function (): void {
            Route::get('/', 'index')->middleware('access:perusahaan-mmea,read');
            Route::post('/', 'store')->name('.store')->middleware('access:perusahaan-mmea,create');
            Route::patch('/{perusahaan}', 'update')->name('.update')->middleware('access:perusahaan-mmea,update');
            Route::delete('/{perusahaan}', 'remove')->name('.remove')->middleware('access:perusahaan-mmea,remove');
            Route::patch('/{perusahaan}/restore', 'restore')->name('.restore')->middleware('access:perusahaan-mmea,destroy');
            Route::delete('/{perusahaan}/destroy', 'destroy')->name('.destroy')->middleware('access:perusahaan-mmea,destroy');
            Route::get('/export', 'export')->name('.export')->middleware('access:perusahaan-mmea,read');

            Route::name('.import')
                ->prefix('/import')
                ->group(function (): void {
                    Route::post('/', 'import')->middleware('access:perusahaan-mmea,create');
                    Route::get('/template', 'downloadTemplate')->name('.template')->middleware('access:perusahaan-mmea,create');
                });
        });

    /**
     * Perusahaan Export
     */
    Route::controller(PerusahaanExportController::class)
        ->name('perusahaan-export')
        ->prefix('/perusahaan-export')
        ->group(function (): void {
            Route::get('/', 'index')->middleware('access:perusahaan-export,read');
            Route::post('/', 'store')->name('.store')->middleware('access:perusahaan-export,create');
            Route::patch('/{perusahaan}', 'update')->name('.update')->middleware('access:perusahaan-export,update');
            Route::delete('/{perusahaan}', 'remove')->name('.remove')->middleware('access:perusahaan-export,remove');
            Route::patch('/{perusahaan}/restore', 'restore')->name('.restore')->middleware('access:perusahaan-export,destroy');
            Route::delete('/{perusahaan}/destroy', 'destroy')->name('.destroy')->middleware('access:perusahaan-export,destroy');
            Route::get('/export', 'export')->name('.export')->middleware('access:perusahaan-export,read');

            Route::name('.import')
                ->prefix('/import')
                ->group(function (): void {
                    Route::post('/', 'import')->middleware('access:perusahaan-export,create');
                    Route::get('/template', 'downloadTemplate')->name('.template')->middleware('access:perusahaan-export,create');
                });
        });

    /**
     * Perusahaan Import
     */
    Route::controller(PerusahaanImportController::class)
        ->name('perusahaan-import')
        ->prefix('/perusahaan-import')
        ->group(function (): void {
            Route::get('/', 'index')->middleware('access:perusahaan-import,read');
            Route::post('/', 'store')->name('.store')->middleware('access:perusahaan-import,create');
            Route::patch('/{perusahaan}', 'update')->name('.update')->middleware('access:perusahaan-import,update');
            Route::delete('/{perusahaan}', 'remove')->name('.remove')->middleware('access:perusahaan-import,remove');
            Route::patch('/{perusahaan}/restore', 'restore')->name('.restore')->middleware('access:perusahaan-import,destroy');
            Route::delete('/{perusahaan}/destroy', 'destroy')->name('.destroy')->middleware('access:perusahaan-import,destroy');
            Route::get('/export', 'export')->name('.export')->middleware('access:perusahaan-import,read');

            Route::name('.import')
                ->prefix('/import')
                ->group(function (): void {
                    Route::post('/', 'import')->middleware('access:perusahaan-import,create');
                    Route::get('/template', 'downloadTemplate')->name('.template')->middleware('access:perusahaan-import,create');
                });
        });

    /**
     * Penerimaan
     */
    Route::controller(PenerimaanController::class)
        ->name('penerimaan')
        ->prefix('/penerimaan')
        ->group(function (): void {
            Route::get('/', 'index')->middleware('access:penerimaan,read');
            Route::post('/', 'store')->name('.store')->middleware('access:penerimaan,create');
            Route::patch('/{penerimaan}', 'update')->name('.update')->middleware('access:penerimaan,update');
            Route::delete('/{penerimaan}', 'remove')->name('.remove')->middleware('access:penerimaan,remove');
            Route::patch('/{penerimaan}/restore', 'restore')->name('.restore')->middleware('access:penerimaan,destroy');
            Route::delete('/{penerimaan}/destroy', 'destroy')->name('.destroy')->middleware('access:penerimaan,destroy');
            Route::get('/export', 'export')->name('.export')->middleware('access:penerimaan,read');

            Route::name('.import')
                ->prefix('/import')
                ->group(function (): void {
                    Route::post('/', 'import')->middleware('access:penerimaan,create');
                    Route::get('/template', 'downloadTemplate')->name('.template')->middleware('access:penerimaan,create');
                });
        });

    /**
     * Pengawasan
     */
    Route::controller(PengawasanController::class)
        ->name('pengawasan')
        ->prefix('/pengawasan')
        ->group(function (): void {
            Route::get('/', 'index')->middleware('access:pengawasan,read');
            Route::post('/', 'store')->name('.store')->middleware('access:pengawasan,create');
            Route::patch('/{pengawasan}', 'update')->name('.update')->middleware('access:pengawasan,update');
            Route::delete('/{pengawasan}', 'remove')->name('.remove')->middleware('access:pengawasan,remove');
            Route::patch('/{pengawasan}/restore', 'restore')->name('.restore')->middleware('access:pengawasan,destroy');
            Route::delete('/{pengawasan}/destroy', 'destroy')->name('.destroy')->middleware('access:pengawasan,destroy');
            Route::get('/export', 'export')->name('.export')->middleware('access:pengawasan,read');

            Route::name('.import')
                ->prefix('/import')
                ->group(function (): void {
                    Route::post('/', 'import')->middleware('access:pengawasan,create');
                    Route::get('/template', 'downloadTemplate')->name('.template')->middleware('access:pengawasan,create');
                });
        });

    /**
     * Penindakan
     */
    Route::controller(PenindakanController::class)
        ->name('penindakan')
        ->prefix('/penindakan')
        ->group(function (): void {
            Route::get('/', 'index')->middleware('access:penindakan,read');
            Route::post('/', 'store')->name('.store')->middleware('access:penindakan,create');
            Route::patch('/{penindakan}', 'update')->name('.update')->middleware('access:penindakan,update');
            Route::delete('/{penindakan}', 'remove')->name('.remove')->middleware('access:penindakan,remove');
            Route::patch('/{penindakan}/restore', 'restore')->name('.restore')->middleware('access:penindakan,destroy');
            Route::delete('/{penindakan}/destroy', 'destroy')->name('.destroy')->middleware('access:penindakan,destroy');
            Route::get('/export', 'export')->name('.export')->middleware('access:penindakan,read');

            Route::name('.import')
                ->prefix('/import')
                ->group(function (): void {
                    Route::post('/', 'import')->middleware('access:penindakan,create');
                    Route::get('/template', 'downloadTemplate')->name('.template')->middleware('access:penindakan,create');
                });
        });

    /**
     * Oprasi alat pemindai
     */
    Route::controller(OperasiAlatPemindaiController::class)
        ->name('operasi-alat-pemindai')
        ->prefix('/operasi-alat-pemindai')
        ->group(function (): void {
            Route::get('/', 'index')->middleware('access:operasi-alat-pemindai,read');
            Route::post('/', 'store')->name('.store')->middleware('access:operasi-alat-pemindai,create');
            Route::patch('/{operasi-alat-pemindai}', 'update')->name('.update')->middleware('access:operasi-alat-pemindai,update');
            Route::delete('/{operasi-alat-pemindai}', 'remove')->name('.remove')->middleware('access:operasi-alat-pemindai,remove');
            Route::patch('/{operasi-alat-pemindai}/restore', 'restore')->name('.restore')->middleware('access:operasi-alat-pemindai,destroy');
            Route::delete('/{operasi-alat-pemindai}/destroy', 'destroy')->name('.destroy')->middleware('access:operasi-alat-pemindai,destroy');
            Route::get('/export', 'export')->name('.export')->middleware('access:operasi-alat-pemindai,read');

            Route::name('.import')
                ->prefix('/import')
                ->group(function (): void {
                    Route::post('/', 'import')->middleware('access:operasi-alat-pemindai,create');
                    Route::get('/template', 'downloadTemplate')->name('.template')->middleware('access:operasi-alat-pemindai,create');
                });
        });

    Route::get('/operasi-alat-telekomunikasi', fn () => redirect('/'))->name('operasi-alat-telekomunikasi');
    Route::get('/operasi-kapal-patroli', fn () => redirect('/'))->name('operasi-kapal-patroli');
    Route::get('/operasi-senjata-api', fn () => redirect('/'))->name('operasi-senjata-api');
    Route::get('/operasi-lainnya', fn () => redirect('/'))->name('operasi-lainnya');
});
