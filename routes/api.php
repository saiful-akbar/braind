<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/ping', function () use ($router) {
    return response()->json(['pong' => 'OK']);
});

/** public route */
$router->group(['prefix' => '/api'], function () use ($router) {
    $router->group(['prefix' => '/auth'], function () use ($router) {
        $router->post('/login', 'AuthController@login');
        $router->post('/logout', 'AuthController@logout');
        $router->put('/refresh', 'AuthController@refresh');
        $router->post('/register', 'UserController@register');
    });

    $router->group(['prefix' => '/menu'], function () use ($router) {
        $router->get("/", 'MenuController@getMenu');
        $router->post("/access/{user_id}", 'MenuController@saveAccess');
        $router->get("/access/{user_id}", 'MenuController@getByUser');
        $router->get("/my", 'MenuController@getMyAccess');
    });

    $router->group(['prefix' => '/file'], function () use ($router) {
        $router->post("/upload", 'FileController@upload');
        $router->post("/import", 'FileController@import');
    });

    $router->group(['prefix' => '/pub'], function () use ($router) {
        $router->group(['prefix' => '/division'], function () use ($router) {
            $router->get("/", 'DivisionController@activeList');
            $router->get("/{slug}", 'DivisionController@getBySlug');
        });
        $router->group(['prefix' => '/import-company'], function () use ($router) {
            $router->get("/{division_id}", 'ImportCompanyController@dashboard');
        });
        $router->group(['prefix' => '/export-company'], function () use ($router) {
            $router->get("/{division_id}", 'ExportCompanyController@dashboard');
        });
        $router->group(['prefix' => '/cukai-mmea-company'], function () use ($router) {
            $router->get("/{division_id}", 'CukaiMMEACompanyController@dashboard');
        });
        $router->group(['prefix' => '/cukai-ht-company'], function () use ($router) {
            $router->get("/{division_id}", 'CukaiHtHptlCompanyController@dashboard');
        });
        $router->group(['prefix' => '/action'], function () use ($router) {
            $router->get("/", 'ActionController@pubList');
        });
        $router->group(['prefix' => '/control'], function () use ($router) {
            $router->get("/", 'ControlController@publicList');
        });
        $router->group(['prefix' => '/galleries'], function () use ($router) {
            $router->get("/byslug/{div_slug}", 'DivisionGalleryController@activeListBySlug');
        });
        $router->group(['prefix' => '/ops'], function () use ($router) {
            $router->get("/patrol-boat/{division_id}", 'OperatingPatrolBoatController@pubActiveList');
            $router->get("/telecomunication-tools/{division_id}", 'OperatingTelecomunicationToolsController@pubActiveList');
            $router->get("/senjata-api/{division_id}", 'OperatingFirearmController@pubActiveList');
            $router->get("/alat-pemindai/{division_id}", 'OperatingScannerController@pubActiveList');
            $router->get("/others/{division_id}", 'OperatingOtherController@pubActiveList');
        });
        $router->group(['prefix' => '/sbp'], function () use ($router) {
            $router->get("/chart", 'SbpController@getChart');
        });
        $router->group(['prefix' => '/receipt'], function () use ($router) {
            $router->get("/chart", 'ReceiptController@getChart');
        });
    });
});

/** protected route */
$router->group(['prefix' => '/api', 'middleware' => 'auth'], function () use ($router) {
    $router->get("/template/excel/{data}", 'FileController@excelTemplate');

    $router->group(['prefix' => '/import-company'], function () use ($router) {
        $router->get("/", 'ImportCompanyController@activeList');
        $router->get("/export/excel", 'ImportCompanyController@excel');
        $router->post("/", 'ImportCompanyController@add');
        $router->group(['prefix' => '/{id}'], function () use ($router) {
            $router->put("/", 'ImportCompanyController@edit');
            $router->get("/", 'ImportCompanyController@get');
            $router->delete("/", 'ImportCompanyController@delete');
        });
    });

    $router->group(['prefix' => '/export-company'], function () use ($router) {
        $router->get("/", 'ExportCompanyController@activeList');
        $router->get("/export/excel", 'ExportCompanyController@excel');
        $router->post("/", 'ExportCompanyController@add');
        $router->group(['prefix' => '/{id}'], function () use ($router) {
            $router->put("/", 'ExportCompanyController@edit');
            $router->get("/", 'ExportCompanyController@get');
            $router->delete("/", 'ExportCompanyController@delete');
        });
    });

    $router->group(['prefix' => '/cukai-mmea-company'], function () use ($router) {
        $router->get("/", 'CukaiMMEACompanyController@activeList');
        $router->get("/export/excel", 'CukaiMMEACompanyController@excel');
        $router->post("/", 'CukaiMMEACompanyController@add');
        $router->group(['prefix' => '/{id}'], function () use ($router) {
            $router->put("/", 'CukaiMMEACompanyController@edit');
            $router->get("/", 'CukaiMMEACompanyController@get');
            $router->delete("/", 'CukaiMMEACompanyController@delete');
        });
    });

    $router->group(['prefix' => '/cukai-ht-hptl-company'], function () use ($router) {
        $router->get("/", 'CukaiHtHptlCompanyController@activeList');
        $router->get("/export/excel", 'CukaiHtHptlCompanyController@excel');
        $router->post("/", 'CukaiHtHptlCompanyController@add');
        $router->group(['prefix' => '/{id}'], function () use ($router) {
            $router->put("/", 'CukaiHtHptlCompanyController@edit');
            $router->get("/", 'CukaiHtHptlCompanyController@get');
            $router->delete("/", 'CukaiHtHptlCompanyController@delete');
        });
    });

    $router->group(['prefix' => '/receipt'], function () use ($router) {
        $router->get("/", 'ReceiptController@activeList');
        $router->get("/export/excel", 'ReceiptController@excel');
        $router->post("/", 'ReceiptController@add');
        $router->group(['prefix' => '/{id}'], function () use ($router) {
            $router->put("/", 'ReceiptController@edit');
            $router->get("/", 'ReceiptController@get');
            $router->delete("/", 'ReceiptController@delete');
        });
    });

    $router->group(['prefix' => '/control'], function () use ($router) {
        $router->get("/", 'ControlController@activeList');
        $router->get("/export/excel", 'ControlController@excel');
        $router->post("/", 'ControlController@add');
        $router->group(['prefix' => '/{id}'], function () use ($router) {
            $router->put("/", 'ControlController@edit');
            $router->get("/", 'ControlController@get');
            $router->delete("/", 'ControlController@delete');
        });
    });

    $router->group(['prefix' => '/operating-patrol-boat'], function () use ($router) {
        $router->get("/", 'OperatingPatrolBoatController@activeList');
        $router->get("/export/excel", 'OperatingPatrolBoatController@excel');
        $router->post("/", 'OperatingPatrolBoatController@add');
        $router->group(['prefix' => '/{id}'], function () use ($router) {
            $router->put("/", 'OperatingPatrolBoatController@edit');
            $router->get("/", 'OperatingPatrolBoatController@get');
            $router->delete("/", 'OperatingPatrolBoatController@delete');
        });
    });

    $router->group(['prefix' => '/operating-telecomunication-tools'], function () use ($router) {
        $router->get("/", 'OperatingTelecomunicationToolsController@activeList');
        $router->get("/export/excel", 'OperatingTelecomunicationToolsController@excel');
        $router->post("/", 'OperatingTelecomunicationToolsController@add');
        $router->group(['prefix' => '/{id}'], function () use ($router) {
            $router->put("/", 'OperatingTelecomunicationToolsController@edit');
            $router->get("/", 'OperatingTelecomunicationToolsController@get');
            $router->delete("/", 'OperatingTelecomunicationToolsController@delete');
        });
    });

    $router->group(['prefix' => '/operating-firearm'], function () use ($router) {
        $router->get("/", 'OperatingFirearmController@activeList');
        $router->get("/export/excel", 'OperatingFirearmController@excel');
        $router->post("/", 'OperatingFirearmController@add');
        $router->group(['prefix' => '/{id}'], function () use ($router) {
            $router->put("/", 'OperatingFirearmController@edit');
            $router->get("/", 'OperatingFirearmController@get');
            $router->delete("/", 'OperatingFirearmController@delete');
        });
    });

    $router->group(['prefix' => '/operating-scanner'], function () use ($router) {
        $router->get("/", 'OperatingScannerController@activeList');
        $router->get("/export/excel", 'OperatingScannerController@excel');
        $router->post("/", 'OperatingScannerController@add');
        $router->group(['prefix' => '/{id}'], function () use ($router) {
            $router->put("/", 'OperatingScannerController@edit');
            $router->get("/", 'OperatingScannerController@get');
            $router->delete("/", 'OperatingScannerController@delete');
        });
    });

    $router->group(['prefix' => '/operating-other'], function () use ($router) {
        $router->get("/", 'OperatingOtherController@activeList');
        $router->get("/export/excel", 'OperatingOtherController@excel');
        $router->post("/", 'OperatingOtherController@add');
        $router->group(['prefix' => '/{id}'], function () use ($router) {
            $router->put("/", 'OperatingOtherController@edit');
            $router->get("/", 'OperatingOtherController@get');
            $router->delete("/", 'OperatingOtherController@delete');
        });
    });

    $router->group(['prefix' => '/auth'], function () use ($router) {
        $router->put('/me', 'UserController@updateMe');
        $router->get('/me', 'AuthController@me');
        $router->put('/set-password', 'UserController@setPassword');
    });

    $router->group(['prefix' => '/user'], function () use ($router) {
        $router->get("/", 'UserController@activeList');
        $router->get("/export/excel", 'UserController@excel');
        $router->group(['prefix' => '/{id}'], function () use ($router) {
            $router->put("/", 'UserController@edit');
            $router->get("/", 'UserController@get');
            $router->delete("/", 'UserController@delete');
        });
    });

    $router->group(['prefix' => '/sbp'], function () use ($router) {
        $router->get("/", 'SbpController@activeList');
        $router->post("/", 'SbpController@add');
        $router->get("/export/excel", 'SbpController@excel');
        $router->group(['prefix' => '/{id}'], function () use ($router) {
            $router->put("/", 'SbpController@edit');
            $router->get("/", 'SbpController@get');
            $router->delete("/", 'SbpController@delete');
        });
    });

    $router->group(['prefix' => '/division'], function () use ($router) {
        $router->get("/", 'DivisionController@activeList');
        $router->get("/profile/byme", 'DivisionController@getProfileByMe');
        $router->post("/", 'DivisionController@add');
        $router->group(['prefix' => '/{id}'], function () use ($router) {
            $router->put("/", 'DivisionController@edit');
            $router->get("/", 'DivisionController@get');
            $router->delete("/", 'DivisionController@delete');
        });
    });

    $router->group(['prefix' => '/division'], function () use ($router) {
        $router->post("/profile/byme", 'DivisionProfileController@setByMe');
        // $router->get("/", 'DivisionProfileController@activeList');
        // $router->group(['prefix' => '/{id}'], function () use ($router) {
        //     $router->delete("/", 'DivisionProfileController@delete');
        // });
    });

    $router->group(['prefix' => '/gallery'], function () use ($router) {
        $router->post("/", 'DivisionGalleryController@add');
        $router->get("/{div_slug}", 'DivisionGalleryController@activeListBySlug');
        $router->group(['prefix' => '/{id}'], function () use ($router) {
            $router->put("/", 'DivisionGalleryController@edit');
            $router->delete("/", 'DivisionGalleryController@delete');
        });
    });

    $router->group(['prefix' => '/action'], function () use ($router) {
        $router->get("/", 'ActionController@activeList');
        $router->get("/export/excel", 'ActionController@excel');
        $router->post("/", 'ActionController@add');
        $router->group(['prefix' => '/{id}'], function () use ($router) {
            $router->put("/", 'ActionController@edit');
            $router->get("/", 'ActionController@get');
            $router->delete("/", 'ActionController@delete');
        });
    });

    $router->group(['prefix' => '/commodity'], function () use ($router) {
        $router->get("/", 'CommodityController@activeList');
        $router->post("/", 'CommodityController@add');
        $router->group(['prefix' => '/{id}'], function () use ($router) {
            $router->put("/", 'CommodityController@edit');
            $router->get("/", 'CommodityController@get');
            $router->delete("/", 'CommodityController@delete');
        });
    });
});
