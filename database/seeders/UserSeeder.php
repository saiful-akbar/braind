<?php

namespace Database\Seeders;

use App\Models\Kantor;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    private function data(): array
    {
        return [
            [
                'kantor'       => 'Pusat',
                'username'     => 'admin',
                'password'     => bcrypt('admin123'),
                'role'         => 'admin',
                'nama_lengkap' => 'Admin',
                'email'        => 'admin@gmail.com',
            ],
            [
                'kantor'       => 'Pusat',
                'username'     => 'guest',
                'password'     => bcrypt('guest123'),
                'role'         => 'kanwil',
                'nama_lengkap' => 'Guest',
                'email'        => 'guest@gmail.com',
            ],
        ];
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->data() as $user) {
            $kantor = Kantor::where('nama', $user['kantor'])->first();

            User::create([
                'kantor_id'    => $kantor->id,
                'username'     => $user['username'],
                'password'     => $user['password'],
                'role'         => $user['role'],
                'nama_lengkap' => $user['nama_lengkap'],
                'email'        => $user['email'],
            ]);
        }
    }
}
