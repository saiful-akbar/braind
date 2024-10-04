<?php

namespace Database\Seeders;

use App\Models\Menu;
use App\Models\User;
use App\Models\MenuGroup;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class MenuKirimanSeeder extends Seeder
{
    private array $data = [
        [
            'nama' => 'Kiriman',
            'sub_menu' => [
                [
                    'nama' => 'PJT',
                    'url' => '/pjt',
                    'route' => 'pjt',
                ],
                [
                    'nama' => 'Laporan',
                    'url' => '/pjt/laporan',
                    'route' => 'pjt.laporan',
                ],
            ]
        ],
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // insert data menu.
        DB::transaction(function () {
            foreach ($this->data as $menuGroup) {
                MenuGroup::create(['nama' => $menuGroup['nama']])
                    ->subMenu()
                    ->createMany($menuGroup['sub_menu']);
            }

            // Ambil menu pjt
            $menus = Menu::whereAny(['route'], 'like', 'pjt%')->get();

            // Tambahkan hak akses menu pada user.
            foreach (User::all() as $user) {
                foreach ($menus as $menu) {
                    $user->menu()->attach($menu->id, [
                        'create'     => $user->username === "Kanwil",
                        'read'       => $user->username === "Kanwil",
                        'update'     => $user->username === "Kanwil",
                        'remove'     => $user->username === "Kanwil",
                        'destroy'    => $user->username === "Kanwil",
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        });
    }
}
