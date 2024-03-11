<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    private function data(): array
    {
        return [
            [
                "kantor_id" => "9b7e8bba-2353-4106-bf8a-47a20254fed3",
                "id" => "9b837aef-0505-4a22-87ac-d2a2407db182",
                "username" => "Atambua",
                "password" => "atambua123",
                "admin" => 0,
                "nama_lengkap" => "Atambua",
                "jenis_kelamin" => "p",
                "email" => "Atambua@gmail.com"
            ],
            [
                "kantor_id" => "9b7e8bb0-31dc-4327-af06-ec9ac349b2ab",
                "id" => "9b837a6a-9308-468e-adda-bc31f96749c1",
                "username" => "Denpasar",
                "password" => "denpasar123",
                "admin" => 0,
                "nama_lengkap" => "Denpasar",
                "jenis_kelamin" => "p",
                "email" => "Denpasar@gmail.com"
            ],
            [
                "kantor_id" => "9b7b9219-a318-4356-afdc-2a4520ae31c0",
                "id" => "9b7b921b-0d5f-4b0c-aeae-6bac1de397dc",
                "username" => "Kanwil",
                "password" => "kanwil123",
                "admin" => 1,
                "nama_lengkap" => "Kanwil DJBC Bali",
                "jenis_kelamin" => "p",
                "email" => "KanwilDJBCBali@gmail.com"
            ],
            [
                "kantor_id" => "9b7e8bd8-b1dd-4063-87a2-7cfa491e1fcf",
                "id" => "9b837c1c-72b6-438a-9aad-b9e26bda4b75",
                "username" => "Kupang",
                "password" => "kupang123",
                "admin" => 0,
                "nama_lengkap" => "Kupang",
                "jenis_kelamin" => "p",
                "email" => "Kupang@gmail.com"
            ],
            [
                "kantor_id" => "9b7e8be1-af83-414c-8e57-eadce9792ddc",
                "id" => "9b837c6b-600b-4ca5-88ac-63be6d083d27",
                "username" => "Labuan Bajo",
                "password" => "labuanbajo123",
                "admin" => 0,
                "nama_lengkap" => "Labuan Bajo",
                "jenis_kelamin" => "p",
                "email" => "LabuanBajo@gmail.com"
            ],
            [
                "kantor_id" => "9b7e8bc5-2a62-4654-ac75-554ba2d3e0e0",
                "id" => "9b837b79-ed1a-4929-b40e-1b5771e05c84",
                "username" => "Mataram",
                "password" => "mataram123",
                "admin" => 0,
                "nama_lengkap" => "Mataram",
                "jenis_kelamin" => "p",
                "email" => "Mataram@gmail.com"
            ],
            [
                "kantor_id" => "9b7e8bb0-31dc-4327-af06-ec9ac349b2ab",
                "id" => "9b7b921b-1285-489b-9e35-80777197dff5",
                "username" => "Ngurah Rai",
                "password" => "ngurahrai123",
                "admin" => 0,
                "nama_lengkap" => "Ngurah Rai",
                "jenis_kelamin" => "p",
                "email" => "NgurahRai@gmail.com"
            ],
            [
                "kantor_id" => "9b7e8bcf-498a-4e52-8eb7-7dba8d9b6d93",
                "id" => "9b837bd3-4819-4db7-9b0c-02a71f3ce0cd",
                "username" => "Sumbawa",
                "password" => "sumbawa123",
                "admin" => 0,
                "nama_lengkap" => "Sumbawa",
                "jenis_kelamin" => "p",
                "email" => "Sumbawa@gmail.com"
            ]
        ];
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->data() as $user) {
            DB::table('users')->insert([
                'id' => $user['id'],
                'kantor_id' => $user['kantor_id'],
                'username' => $user['username'],
                'password' => bcrypt($user['password']),
                'admin' => $user['admin'],
                'nama_lengkap' => $user['nama_lengkap'],
                'jenis_kelamin' => $user['jenis_kelamin'],
                'email' => $user['email'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
