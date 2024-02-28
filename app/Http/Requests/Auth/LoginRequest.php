<?php

namespace App\Http\Requests\Auth;

use App\Models\MenuGroup;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'username' => ['required', 'string'],
            'password' => ['required', 'string'],
        ];
    }

    /**
     * Attempt to authenticate the request's credentials.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function authenticate(): void
    {
        if (!Auth::attempt($this->only('username', 'password'))) {
            throw ValidationException::withMessages([
                'username' => 'Username atau password anda salah.',
            ]);
        }
    }

    /**
     * Buat sessio untuk menu user.
     */
    public function generateSessionMenu(): void
    {
        session([
            'menu' => MenuGroup::with([
                'subMenu' => function ($query): void {
                    $query->join('menu_user', 'menu.id', '=', 'menu_user.menu_id')
                        ->where('menu_user.user_id', '=', user()->id)
                        ->where('menu_user.read', '=', 1)
                        ->select([
                            'menu.*',
                            'menu_user.create',
                            'menu_user.read',
                            'menu_user.update',
                            'menu_user.remove',
                            'menu_user.destroy',
                        ]);
                }
            ])
                ->whereRelation('subMenu.userWithReadAccess', 'user_id', '=', user()->id)
                ->get(),
        ]);
    }

    /**
     * Buat session untuk akses user
     */
    public function generateSessionAccess(): void
    {
        session(['access' => user()->menu]);
    }
}
