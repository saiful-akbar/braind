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
    public function insert(): void
    {
        DB::transaction(function (): void {
            foreach ($this->all() as $menu) {
                $this->user->menu()->attach($menu['id'], [
                    'create' => $menu['create'],
                    'read' => $menu['read'],
                    'update' => $menu['update'],
                    'remove' => $menu['remove'],
                    'destroy' => $menu['destroy'],
                ]);
            }
        });
    }
}
