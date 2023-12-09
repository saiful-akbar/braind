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
            'name' => 'Master',
            'menus' => [
                [
                    'name' => 'Kanwil',
                    'uri' => '/division',
                    'route' => 'division',
                ],
                [
                    'name' => 'SBP',
                    'uri' => '/sbp',
                    'route' => 'sbp',
                ],
                [
                    'name' => 'Kode Komoditi',
                    'uri' => '/commodity',
                    'route' => 'commodity',
                ],
                [
                    'name' => 'User',
                    'uri' => '/user',
                    'route' => 'user',
                ],
            ],
        ],
        // [
        //     'name' => 'Kanwil',
        //     'menus' => [
        //         [
        //             'name' => 'Profil',
        //             'uri' => '/division/profile',
        //             'route' => 'division.profile',
        //         ],
        //         [
        //             'name' => 'Peta Kerawanan',
        //             'uri' => '/division/map',
        //             'route' => 'division.map',
        //         ],
        //     ],
        // ],
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::find(1);


        DB::transaction(function () use ($admin): void {
            foreach ($this->data as $menuGroup) {
                MenuGroup::create(['name' => $menuGroup['name']])
                    ->childrens()
                    ->createMany($menuGroup['menus']);
            }

            foreach (Menu::all() as $menu) {
                $admin->menus()->attach($menu->id, [
                    'create' => true,
                    'read' => true,
                    'update' => true,
                    'delete' => true,
                    'destroy' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        });
    }
}
