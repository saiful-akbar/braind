<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\MenuSeeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\KantorSeeder;
use Database\Seeders\PerusahaanSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            KantorSeeder::class,
            UserSeeder::class,
            MenuSeeder::class,
            PerusahaanSeeder::class,
        ]);
    }
}
