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
                    'url' => '/division',
                    'route' => 'division',
                ],
                [
                    'name' => 'SBP',
                    'url' => '/sbp',
                    'route' => 'sbp',
                ],
                [
                    'name' => 'Kode Komoditi',
                    'url' => '/commodity',
                    'route' => 'commodity',
                ],
                [
                    'name' => 'User',
                    'url' => '/user',
                    'route' => 'user',
                ],
            ],
        ],
        // [
        //     'name' => 'Kanwil',
        //     'menus' => [
        //         [
        //             'name' => 'Profil',
        //             'url' => '/division/profile',
        //             'route' => 'division.profile',
        //         ],
        //         [
        //             'name' => 'Peta Kerawanan',
        //             'url' => '/division/map',
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
        $guest = User::find(2);


        DB::transaction(function () use ($admin, $guest): void {
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
                    'remove' => true,
                    'destroy' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                $guest->menus()->attach($menu->id, [
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
