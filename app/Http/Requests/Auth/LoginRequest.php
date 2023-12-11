<?php

namespace App\Http\Requests\Auth;

use App\Models\MenuGroup;
use App\Models\User;
use App\Models\UserEmail;
use App\Models\UserPassword;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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
            'email' => ['required', 'string', 'email'],
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
        $email = $this->validateEmail();

        if (is_null($email)) {
            throw $this->exceptionMessage();
        }

        $password = $this->validatePassword($email->user_id);

        if (is_null($password)) {
            throw $this->exceptionMessage();
        }

        Auth::login(User::find($password->user_id));
    }

    /**
     * Validasi email
     */
    private function validateEmail(): ?UserEmail
    {
        return UserEmail::where('email', $this->email)
            ->where('active', true)
            ->first();
    }

    /**
     * Validasi password
     */
    private function validatePassword(int $userId): UserPassword|ValidationException|null
    {
        $userPassword = UserPassword::where('user_id', $userId)
            ->where('active', true)
            ->first();

        if (!Hash::check($this->password, $userPassword->password)) {
            throw $this->exceptionMessage();
        }

        return $userPassword;
    }

    /**
     * Pesan error
     */
    private function exceptionMessage(): ValidationException
    {
        return ValidationException::withMessages([
            'email' => trans('auth.failed'),
        ]);
    }

    /**
     * Buat sessio untuk menu user.
     */
    public function generateSessionMenu(): void
    {
        $columns = [
            'menus.*',
            'menu_user.create',
            'menu_user.read',
            'menu_user.update',
            'menu_user.delete',
            'menu_user.destroy',
        ];

        $query = MenuGroup::with([
            'childrens' => function ($query) use($columns): void {
                $query->whereRelation('usersWithReadAccess', 'user_id', '=', user()?->id)
                    ->leftJoin('menu_user', 'menus.id', '=', 'menu_user.menu_id')
                    ->orderBy('menus.name', 'asc')
                    ->select($columns);
            }
        ]);
        
        $result = $query->whereRelation('childrens.usersWithReadAccess', 'user_id', '=', user()->id)
            ->orderBy('menu_groups.name', 'asc')
            ->get();

        session(['menu' => $result]);
    }

    /**
     * Buat session untuk akses user
     */
    public function generateSessionAccess(): void
    {
        session(['access' => auth()->user()->menus]);
    }
}
