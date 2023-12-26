<?php

namespace App\Http\Requests\Users;

use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Http\FormRequest;

class UpdateAccessUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Perbarui akses user
     */
    public function update(): void
    {
        DB::transaction(function () {
            foreach ($this->all() as $menu) {
                DB::table('menu_user')
                    ->where('menu_id', '=', $menu['id'])
                    ->where('user_id', '=', $this->user->id)
                    ->update([
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
