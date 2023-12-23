<?php

namespace App\Http\Requests\Users;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Http\FormRequest;

class StoreAccessUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Simpan menu akses user pada database
     */
    public function save(User $user)
    {
        DB::transaction(function () use ($user): void {
            foreach ($this->all() as $menu) {
                $user->menus()->attach($menu['id'], [
                    'creat' => $menu['create'],
                    'read' => $menu['read'],
                    'update' => $menu['update'],
                    'remove' => $menu['remove'],
                    'destroy' => $menu['destroy'],
                ]);
            }
        });
    }
}
