<?php

namespace App\Http\Controllers;

use Inertia\Response;
use App\Models\Division;
use App\Exports\UserExport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Requests\Users\UserRequest;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class UserController extends Controller
{
    /**
     * Menampilkan halaman utama master user.
     */
    public function index(UserRequest $request): Response
    {
        $access = $this->getAccessByRoute('user');
        $data = $request->paginate($access);

        return $this->renderPaginate(
            component: 'User/index',
            paginator: $data,
            access: $access,
        );
    }

    /**
     * Export excel
     */
    public function export(Request $request): BinaryFileResponse
    {
        $access = $this->getAccessByRoute('user');
        $name = 'braind_export_user.xlsx';

        return  Excel::download(new UserExport($request, $access), $name);
    }

    /**
     * Menampilkan halaman tambah user
     */
    public function create(): Response
    {
        $divisions = Division::select('id as value', 'name as label')->get();

        return $this->render(component: 'User/Create/index', data: [
            'divisions' => $divisions
        ]);
    }
}
