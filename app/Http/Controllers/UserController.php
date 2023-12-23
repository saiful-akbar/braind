<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Response;
use App\Models\Division;
use App\Exports\UserExport;
use App\Http\Requests\Users\StoreAccessUserRequest;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Requests\Users\UserRequest;
use App\Http\Requests\Users\StoreUserRequest;
use App\Models\MenuGroup;
use Illuminate\Http\RedirectResponse;
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

    /**
     * Simpan user baru ke database
     */
    public function store(StoreUserRequest $request)
    {
        $user = $request->save();

        return to_route('user.access', ['user' => $user->id])->with([
            'flash.status' => 'success',
            'flash.message' => 'Pengguna baru berhasil ditambahkan.'
        ]);
    }

    /**
     * Menampilkan halaman untuk membuat menu akses pada user.
     */
    public function access(User $user): Response|RedirectResponse
    {
        if ($user->menus()->count() > 1) {
            return to_route('user');
        }

        $menus = MenuGroup::with([
            'childrens' => fn ($query) => $query->orderBy('menus.name', 'asc')
        ])->orderBy('name', 'asc')->get();

        return $this->render('User/Access/Create/index', [
            'menus' => $menus,
            'user' => $user,
        ]);
    }

    /**
     * Menyimpan hak akses baru pada user.
     */
    public function storeAccess(StoreAccessUserRequest $request, User $user): RedirectResponse
    {
        $request->save(user: $user);

        return to_route('user')->with([
            'flash.status' => 'success',
            'flash.message' => 'Hak akses user berhasil dibuat.'
        ]);
    }
}
