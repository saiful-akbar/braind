<?php

namespace Database\Seeders;

use App\Models\Division;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    private function data(): array
    {
        return [
            [
                'division' => 'Pusat',
                'username' => 'admin',
                'password' => bcrypt('admin123'),
                'full_name' => 'Admin',
                'email' => 'admin@gmail.com',
            ],
            [
                'division' => 'Pusat',
                'username' => 'guest',
                'password' => bcrypt('guest123'),
                'full_name' => 'Guest',
                'email' => 'guest@gmail.com',
            ],
        ];
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->data() as $user) {
            $division = Division::where('name', $user['division'])->first();

            User::create([
                'division_id' => $division->id,
                'username' => $user['username'],
                'password' => $user['password'],
                'full_name' => $user['full_name'],
                'email' => $user['email'],
            ]);
        }
    }
}
