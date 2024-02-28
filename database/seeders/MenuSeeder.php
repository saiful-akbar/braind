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
                    'nama' => 'Kode Komoditi',
                    'url' => '/komoditi',
                    'route' => 'komoditi',
                ],
                [
                    'nama' => 'Perusahaan',
                    'url' => '/master-perusahaan',
                    'route' => 'master-perusahaan',
                ],
                [
                    'nama' => 'SBP', // Surat Bukti Penindakan
                    'url' => '/sbp',
                    'route' => 'sbp',
                ],
                [
                    'nama' => 'User',
                    'url' => '/user',
                    'route' => 'user',
                ],
            ],
        ],
        [
            'nama' => 'Data Perusahaan',
            'sub_menu' => [
                [
                    'nama' => 'Cukai HT + HPTL',
                    'url' => '/perusahaan-hthptl',
                    'route' => 'perusahaan-hthptl',
                ],
                [
                    'nama' => 'Cukai MMEA',
                    'url' => '/perusahaan-mmea',
                    'route' => 'perusahaan-mmea',
                ],
                [
                    'nama' => 'Export',
                    'url' => '/perusahaan-export',
                    'route' => 'perusahaan-export',
                ],
                [
                    'nama' => 'Import',
                    'url' => '/perusahaan-import',
                    'route' => 'perusahaan-import',
                ],
            ],
        ],
        [
            'nama' => 'Data Penerimaan',
            'sub_menu' => [
                [
                    'nama' => 'Penerimaan',
                    'url' => '/penerimaan',
                    'route' => 'penerimaan',
                ],
            ],
        ],
        [
            'nama' => 'Data Pengawasan',
            'sub_menu' => [
                [
                    'nama' => 'Pengawasan',
                    'url' => '/pengawasan',
                    'route' => 'pengawasan',
                ],
                [
                    'nama' => 'Penindakan',
                    'url' => '/penindakan',
                    'route' => 'penindakan',
                ],
            ],
        ],
        [
            'nama' => 'Sarana Operasi',
            'sub_menu' => [
                [
                    'nama' => 'Alat Pemindai & Pendeteksi',
                    'url' => '/operasi-alat-pemindai',
                    'route' => 'operasi-alat-pemindai',
                ],
                [
                    'nama' => 'ALat Telekomunikasi',
                    'url' => '/operasi-alat-telekomunikasi',
                    'route' => 'operasi-alat-telekomunikasi',
                ],
                [
                    'nama' => 'Kapal Patroli',
                    'url' => '/operasi-kapal-patroli',
                    'route' => 'operasi-kapal-patroli',
                ],
                [
                    'nama' => 'Senjata Api',
                    'url' => '/operasi-senjata-api',
                    'route' => 'operasi-senjata-api',
                ],
                [
                    'nama' => 'Sarana Operasi Lainnya',
                    'url' => '/operasi-lainnya',
                    'route' => 'operasi-lainnya',
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
