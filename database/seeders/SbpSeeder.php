<?php

namespace Database\Seeders;

use App\Models\Sbp;
use App\Models\Kantor;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class SbpSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kantor = Kantor::where('nama', 'pusat')->first();
        $user = User::where('username', 'admin')->first();

        for ($i = 1; $i <= 1000; $i++) {
            Sbp::create([
                'kantor_id' => $kantor->id,
                'user_id' => $user->id,
                'jumlah' => $i + 1000000,
                'tindak_lanjut' => $i + 1000000,
                'tanggal_input' => date('Y-m-d'),
            ]);
        }
    }
}
