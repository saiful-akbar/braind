<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    private function data(): array
    {
        return [
            [
                'division_id' => 1,
                'name' => 'Admin',
                'role' => 'admin',
                'email' => [
                    'email' => 'admin@gmail.com',
                    'primary' => 1,
                    'active' => 1,
                ],
                'password' => [
                    'password' => bcrypt('123456'),
                    'active' => 1,
                ],
            ],
            [
                'division_id' => 1,
                'name' => 'Guest',
                'role' => 'kanwil',
                'email' => [
                    'email' => 'guest@gmail.com',
                    'primary' => 1,
                    'active' => 1,
                ],
                'password' => [
                    'password' => bcrypt('123456'),
                    'active' => 1,
                ],
            ],
        ];
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->data() as $user) {
            $created = User::create([
                'division_id' => null,
                'name' => $user['name'],
                'role' => $user['role'],
            ]);

            $created->emails()->create($user['email']);
            $created->password()->create($user['password']);
        }
    }
}
