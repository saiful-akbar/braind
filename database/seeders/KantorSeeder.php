<?php

namespace Database\Seeders;

use App\Models\Kantor;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class KantorSeeder extends Seeder
{
    private array $data = [
        [
            "id" => "9b85c132-4cf4-4afe-85c2-5ecedeb98921",
            "nama" => "Pusat"
        ],
        [
            "id" => "9b7b9219-a318-4356-afdc-2a4520ae31c0",
            "nama" => "Kanwil DJBC Bali, NTB dan NTT"
        ],
        [
            "id" => "9b7e8bb0-31dc-4327-af06-ec9ac349b2ab",
            "nama" => "KPPBC TMP A Denpasar"
        ],
        [
            "id" => "9b7e8bba-2353-4106-bf8a-47a20254fed3",
            "nama" => "KPPBC TMP B Atambua"
        ],
        [
            "id" => "9b7e8bd8-b1dd-4063-87a2-7cfa491e1fcf",
            "nama" => "KPPBC TMP C Kupang"
        ],
        [
            "id" => "9b7e8be1-af83-414c-8e57-eadce9792ddc",
            "nama" => "KPPBC TMP C Labuan Bajo"
        ],
        [
            "id" => "9b7e8bc5-2a62-4654-ac75-554ba2d3e0e0",
            "nama" => "KPPBC TMP C Mataram"
        ],
        [
            "id" => "9b7e8bcf-498a-4e52-8eb7-7dba8d9b6d93",
            "nama" => "KPPBC TMP C Sumbawa"
        ],
        [
            "id" => "9b7b9219-aec2-4be1-a516-825985a1ad53",
            "nama" => "KPPBC TMP Ngurah Rai"
        ]
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->data as $data) {
            DB::table('kantor')->insert([
                'id' => $data['id'],
                'nama' => $data['nama'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
