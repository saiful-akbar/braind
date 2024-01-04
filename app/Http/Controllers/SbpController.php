<?php

namespace App\Http\Controllers;

use App\Models\Sbp;
use Inertia\Response;
use App\Models\Kantor;
use App\Exports\SbpExport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Requests\Sbp\SbpRequest;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\Sbp\StoreSbpRequest;
use App\Http\Requests\Sbp\UpdateSbpRequest;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class SbpController extends Controller
{
    /**
     * Menampilkan halaman master SBP
     */
    public function index(SbpRequest $request): Response|RedirectResponse
    {
        if (is_null($request->query('start_period')) || is_null($request->query('end_period'))) {
            return to_route('sbp', [
                'start_period' => $request->query('start_period', date('Y-m-01')),
                'end_period' => $request->query('end_period', date('Y-m-d')),
            ]);
        }

        $access = $this->getAccessByRoute('sbp');

        return $this->renderPaginate(
            component: 'Sbp/index',
            paginator: $request->paginate($access),
            access: $access,
        );
    }

    /**
     * Menampilkan halaman tambah data SBP
     */
    public function create(): Response
    {
        $access = $this->getAccessByRoute('sbp');
        $kantor = Kantor::select('id as value', 'nama as label')
            ->orderBy('nama', 'desc')
            ->get();

        return $this->render(
            component: 'Sbp/Create/index',
            data: compact('kantor'),
            access: $access,
        );
    }

    /**
     * Tambahkan sbp baru pada database
     */
    public function store(StoreSbpRequest $request): RedirectResponse
    {
        $request->insert();

        return to_route('sbp.create')->with([
            'flash.status' => 'success',
            'flash.message' => 'Data SBP berhasil ditambahkan.'
        ]);
    }

    /**
     * Export excel
     */
    public function export(Request $request): BinaryFileResponse
    {
        $access = $this->getAccessByRoute('sbp');
        $name = 'braind_master_sbp.xlsx';

        return Excel::download(new SbpExport($request, $access), $name);
    }

    /**
     * Menampilkan halaman edit SBP
     */
    public function edit(Sbp $sbp): Response
    {
        $kantor = Kantor::select('id as value', 'nama as label')
            ->orderBy('nama', 'desc')
            ->get();

        return $this->render(
            component: 'Sbp/Edit/index',
            data: [
                'sbp' => $sbp,
                'kantor' => $kantor,
            ],
        );
    }

    /**
     * Perbarui data SBP pada database.
     */
    public function update(UpdateSbpRequest $request, Sbp $sbp): RedirectResponse
    {
        $request->update();

        return to_route('sbp.edit', ['sbp' => $sbp->id])->with([
            'flash.status' => 'success',
            'flash.message' => 'Data SBP berhasil diperbarui.',
        ]);
    }

    /**
     * Remove data SBP (soft delete)
     */
    public function remove(Sbp $sbp): JsonResponse
    {
        $sbp->delete();
        return $this->jsonResponse();
    }

    /**
     * Restore data SBP
     */
    public function restore(string $id): JsonResponse
    {
        $sbp = Sbp::onlyTrashed()->findOrFail($id);
        $sbp->restore();

        return $this->jsonResponse();
    }

    /**
     * Destroy data SBP (permanent delete)
     */
    public function destroy(string $id): JsonResponse
    {
        $sbp = Sbp::onlyTrashed()->findOrFail($id);
        $sbp->forceDelete();

        return $this->jsonResponse();
    }
}
