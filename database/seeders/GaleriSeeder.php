<?php

namespace Database\Seeders;

use App\Models\GaleriKantor;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GaleriSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 300; $i++) {
            GaleriKantor::create([
                'kantor_id' => "9b85c132-4cf4-4afe-85c2-5ecedeb98921",
                'video_url' => 'LaCdAiYjPAQ',
                'tipe' => 'galeri',
                'judul' => 'Video Seeder',
                'keterangan' => 'PWK - MAELL LEE KLARIFIKASI PISAH DENGAN MARCO & DJAROT, TERNYATA ADA MASALAH ?!',
            ]);
        }
    }
}
