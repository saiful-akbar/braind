<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Response;
use App\Models\Kantor;
use App\Models\MenuGroup;
use App\Exports\UserExport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\Users\UserRequest;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Requests\Users\StoreUserRequest;
use App\Http\Requests\Users\StoreAccessUserRequest;
use App\Http\Requests\Users\UpdateAccessUserRequest;
use App\Http\Requests\Users\UpdateUserRequest;
use Illuminate\Http\JsonResponse;
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
        $name = 'braind_master_user.xlsx';

        return  Excel::download(new UserExport($request, $access), $name);
    }

    /**
     * Menampilkan halaman tambah user
     */
    public function create(): Response
    {
        $kantor = Kantor::select('id as value', 'nama as label')->get();

        return $this->render(component: 'User/Create/index', data: [
            'kantor' => $kantor
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
        if ($user->menu()->count() > 1) {
            return to_route('user');
        }

        $menu = MenuGroup::with([
            'subMenu' => fn ($query) => $query->orderBy('menu.nama', 'asc')
        ])->orderBy('nama', 'asc')->get();

        return $this->render('User/Access/Create/index', [
            'menu' => $menu,
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

    /**
     * Menampilkan halaman edit user.
     */
    public function edit(User $user): Response
    {
        $kantor = Kantor::select('id AS value', 'nama AS label')->get();

        return $this->render(
            component: 'User/Edit/index',
            access: $this->getAccessByRoute('user'),
            data: compact('user', 'kantor'),
        );
    }

    /**
     * Simpan perubahan data user pada database.
     */
    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $request->update();

        return to_route('user.edit', ['user' => $user->id])->with([
            'flash.status' => 'success',
            'flash.message' => 'Data user berhasil diperbarui.'
        ]);
    }

    /**
     * Menampilkan halaman detail user
     */
    public function show(User $user): Response
    {
        return $this->render(
            component: 'User/Show/index',
            data: $user->load('kantor'),
            access: $this->getAccessByRoute('user')
        );
    }

    /**
     * Hapus user (soft delete)
     */
    public function remove(Request $request, User $user): RedirectResponse
    {
        $user->delete();

        return to_route('user', $request->all())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data user berhasil dihapus.',
        ]);
    }

    /**
     * Pulihkan user dari soft delete (restore)
     */
    public function restore(Request $request, string $id): RedirectResponse
    {
        $user = User::onlyTrashed()->findOrFail($id);

        if (!is_null($user)) {
            $user->restore();
        }

        return to_route('user', $request->all())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data user berhasil dipulihkan.',
        ]);
    }

    /**
     * menghpaus permanen user dari database.
     */
    public function destroy(Request $request, string $id): RedirectResponse
    {
        $user = User::onlyTrashed()->findOrFail($id);

        if (!is_null($user)) {
            $user->forceDelete();
        }

        return to_route('user', $request->all())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data user berhasil dihapus selamanya.',
        ]);
    }

    /**
     * menampilkan halaman edit access
     */
    public function editAccess(User $user): mixed
    {
        $menu = MenuGroup::with([
            'subMenu' => function ($query) use ($user): void {
                $columns = [
                    'menu.*',
                    'menu_user.create',
                    'menu_user.read',
                    'menu_user.update',
                    'menu_user.remove',
                    'menu_user.destroy',
                ];

                $query->select($columns)
                    ->leftJoin('menu_user', 'menu.id', '=', 'menu_user.menu_id')
                    ->where('menu_user.user_id', '=', $user->id)
                    ->orderBy('menu.nama', 'asc');
            }
        ])->orderBy('nama', 'asc')->get();

        // ambil data akses user.
        $access = $this->getAccessByRoute('user');

        // render komponen
        return $this->render(
            component: 'User/Access/Edit/index',
            access: $access,
            data: compact('user', 'menu'),
        );
    }

    /**
     * Perbarui data menu akses user pada database
     */
    public function updateAccess(UpdateAccessUserRequest $request, User $user): RedirectResponse
    {
        $request->update($user);

        return to_route('user.access.edit', ['user' => $user->id])->with([
            'flash.status' => 'success',
            'flash.message' => 'Akses user berhasil diperbarui.'
        ]);
    }
}
