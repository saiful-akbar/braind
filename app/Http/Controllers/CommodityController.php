<?php

namespace App\Http\Controllers;

use App\Http\Requests\Commodities\CommodityRequest;
use App\Http\Requests\Commodities\StoreCommodityRequest;
use App\Models\Commodity;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class CommodityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(CommodityRequest $request): Response
    {
        // ambil data akses user pada route "commodity".
        $access = $this->getAccessByRoute('commodity');

        return $this->renderPaginate(
            component: 'Commodity/index',
            paginator: $request->paginate($access),
            access: $access
        );
    }

    /**
     * Menyimpan data baru pada tabel commodities.
     */
    public function store(StoreCommodityRequest $request): JsonResponse
    {
        $data = $request->save();

        return $this->jsonResponse($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Commodity $commodity)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Commodity $commodity)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Commodity $commodity)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Commodity $commodity)
    {
        //
    }
}
