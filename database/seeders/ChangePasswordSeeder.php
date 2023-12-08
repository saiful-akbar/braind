<?php

namespace Database\Seeders;

use App\Models\UserPassword;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ChangePasswordSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UserPassword::where('active', true)->update([
            'password' => bcrypt('123456')
        ]);
    }
}
