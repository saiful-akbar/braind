<?php

namespace Database\Seeders;

use App\Models\Menu;
use App\Models\User;
use App\Models\MenuGroup;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class MenuSeeder extends Seeder
{
    private array $data = [
        [
            'nama' => 'Data Master',
            'sub_menu' => [
                [
                    'nama' => 'Kantor',
                    'url' => '/kantor',
                    'route' => 'kantor',
                ],
                [
                    'nama' => 'SBP', // Surat Bukti Penindakan
                    'url' => '/sbp',
                    'route' => 'sbp',
                ],
                [
                    'nama' => 'Kode Komoditi',
                    'url' => '/komoditi',
                    'route' => 'komoditi',
                ],
                [
                    'nama' => 'User',
                    'url' => '/user',
                    'route' => 'user',
                ],
                [
                    'nama' => 'Perusahaan',
                    'url' => '/master-perusahaan',
                    'route' => 'master-perusahaan',
                ],
            ],
        ],
        [
            'nama' => 'Data Perusahaan',
            'sub_menu' => [
                [
                    'nama' => 'Cukai HT + HPTL',
                    'url' => '/perusahaan-ht-hptl',
                    'route' => 'perusahaan-hthptl',
                ],
                [
                    'nama' => 'Cukai MMEA',
                    'url' => '/perusahaan-mmea',
                    'route' => 'perusahaan-mmea',
                ],
                [
                    'nama' => 'Import',
                    'url' => '/perusahaan-impor',
                    'route' => 'perusahaan-impor',
                ],
                [
                    'nama' => 'Export',
                    'url' => '/perusahaan-export',
                    'route' => 'perusahaan-export',
                ],
            ],
        ],
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('username', 'Admin')->first();
        $guest = User::where('username', 'guest')->first();


        DB::transaction(function () use ($admin, $guest): void {
            foreach ($this->data as $menuGroup) {
                MenuGroup::create(['nama' => $menuGroup['nama']])
                    ->subMenu()
                    ->createMany($menuGroup['sub_menu']);
            }

            foreach (Menu::all() as $menu) {
                $admin->menu()->attach($menu->id, [
                    'create' => true,
                    'read' => true,
                    'update' => true,
                    'remove' => true,
                    'destroy' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                $guest->menu()->attach($menu->id, [
                    'create' => false,
                    'read' => true,
                    'update' => false,
                    'remove' => false,
                    'destroy' => false,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        });
    }
}
