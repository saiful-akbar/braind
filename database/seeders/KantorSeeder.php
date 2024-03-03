<?php

namespace Database\Seeders;

use App\Models\Kantor;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KantorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Kantor::create(['nama' => 'Pusat']);
        Kantor::create(['nama' => 'Cabang']);
    }
}
