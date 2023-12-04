<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\MenuController;

use App\Context\Reader;
use App\Models\Division;
use Illuminate\Http\Request;

class GetAccessReader implements Reader
{
    private $valid;

    public function __construct(Request $request)
    {
        $this->valid = $request->all();
    }

    public function read()
    {
        $user = auth()->user();
        if (is_null($user)) {
            return $this->getPublicMenu();;
        }
        return self::DefaultMenu();
    }

    public static function DefaultMenu()
    {
        return [
            [
                'access' => false,
                'icon' => 'table',
                'name' => 'Dashboard',
                'route' => 'admin.dashboard',
                'route_name' => 'admin.dashboard',
                'expand' => false,
            ],
            [
                'access' => false,
                'icon' => 'asterisk',
                'name' => 'Master',
                'route' => 'parent',
                'route_name' => 'master',
                'expand' => false,
                'children' => [
                    [
                        'access' => false,
                        'icon' => 'toggle-off',
                        'name' => 'Data Kanwil',
                        'route' => 'master.kanwil',
                        'route_name' => 'master.kanwil',
                    ],
                    [
                        'access' => false,
                        'icon' => 'toggle-off',
                        'name' => 'Data SBP',
                        'route' => 'master.sbp',
                        'route_name' => 'master.sbp',
                    ],
                    [
                        'access' => false,
                        'icon' => 'toggle-off',
                        'name' => 'User',
                        'route' => 'master.user',
                        'route_name' => 'master.user',
                    ],
                    [
                        'access' => false,
                        'icon' => 'toggle-off',
                        'name' => 'Kode Komodity',
                        'route' => 'master.commodity',
                        'route_name' => 'master.commodity',
                    ],
                ]
            ],
            [
                'access' => false,
                'icon' => 'table',
                'name' => 'Profil',
                'route' => 'admin.division.profile',
                'route_name' => 'admin.division.profile',
                'expand' => false,
            ],
            [
                'access' => false,
                'icon' => 'table',
                'name' => 'Peta Kerawanan',
                'route' => 'admin.division.map',
                'route_name' => 'admin.division.map',
                'expand' => false,
            ],
            [
                'access' => false,
                'icon' => 'building',
                'name' => 'Data Perusahaan',
                'route' => 'parent',
                'route_name' => 'perusahaan',
                'expand' => false,
                'children' => [
                    [
                        'access' => false,
                        'icon' => 'table',
                        'name' => 'Import',
                        'route' => 'perusahaan.import',
                        'route_name' => 'perusahaan.import',
                    ],
                    [
                        'access' => false,
                        'icon' => 'table',
                        'name' => 'Eksport',
                        'route' => 'perusahaan.export',
                        'route_name' => 'perusahaan.export',
                    ],
                    [
                        'access' => false,
                        'icon' => 'table',
                        'name' => 'Cukai MMEA',
                        'route' => 'perusahaan.cukai.mmea',
                        'route_name' => 'perusahaan.cukai.mmea',
                    ],
                    [
                        'access' => false,
                        'icon' => 'table',
                        'name' => 'Cukai HT + HPTL',
                        'route' => 'perusahaan.cukai.ht.hptl',
                        'route_name' => 'perusahaan.cukai.ht.hptl',
                    ],
                ]
            ],
            [
                'access' => false,
                'icon' => 'file-invoice',
                'name' => 'Data Penerimaan',
                'route' => 'penerimaan',
                'route_name' => 'penerimaan',
                'expand' => false,
            ],
            [
                'access' => false,
                'icon' => 'tv',
                'name' => 'Data Pengawasan',
                'route' => 'parent',
                'route_name' => 'pengawasan',
                'expand' => false,
                'children' => [
                    [
                        'access' => false,
                        'icon' => 'table',
                        'name' => 'Import',
                        'route' => 'pengawasan.import',
                        'route_name' => 'pengawasan.import',
                    ],
                    [
                        'access' => false,
                        'icon' => 'table',
                        'name' => 'Eksport',
                        'route' => 'pengawasan.export',
                        'route_name' => 'pengawasan.export',
                    ],
                    [
                        'access' => false,
                        'icon' => 'table',
                        'name' => 'Cukai MMEA',
                        'route' => 'pengawasan.cukai.mmea',
                        'route_name' => 'pengawasan.cukai.mmea',
                    ],
                    [
                        'access' => false,
                        'icon' => 'table',
                        'name' => 'Cukai HT',
                        'route' => 'pengawasan.cukai.ht',
                        'route_name' => 'pengawasan.cukai.ht',
                    ],
                    [
                        'access' => false,
                        'icon' => 'table',
                        'name' => 'Cukai EA',
                        'route' => 'pengawasan.cukai.ea',
                        'route_name' => 'pengawasan.cukai.ea',
                    ],
                    [
                        'access' => false,
                        'icon' => 'table',
                        'name' => 'Penindakan',
                        'route' => 'pengawasan.penindakan',
                        'route_name' => 'pengawasan.penindakan',
                    ],
                ]
            ],
            [
                'access' => false,
                'icon' => 'user-cog',
                'name' => 'Sarana Operasi',
                'route' => 'parent',
                'route_name' => 'pengoperasian',
                'expand' => false,
                'children' => [
                    [
                        'access' => false,
                        'icon' => 'table',
                        'name' => 'Kapal Patroli',
                        'route' => 'pengoperasian.kapal.patroli',
                        'route_name' => 'pengoperasian.kapal.patroli',
                    ],
                    [
                        'access' => false,
                        'icon' => 'table',
                        'name' => 'Alat Telekomunikasi',
                        'route' => 'pengoperasian.alat.telekomunikasi',
                        'route_name' => 'pengoperasian.alat.telekomunikasi',
                    ],
                    [
                        'access' => false,
                        'icon' => 'table',
                        'name' => 'Senjata Api',
                        'route' => 'pengoperasian.senjata.api',
                        'route_name' => 'pengoperasian.senjata.api',
                    ],
                    [
                        'access' => false,
                        'icon_name' => 'table',
                        'name' => 'Alat Pemindai dan Pendeteksi',
                        'route' => 'pengoperasian.alat.pemindai.pendeteksi',
                        'route_name' => 'pengoperasian.alat.pemindai.pendeteksi',
                    ],
                    [
                        'access_name' => false,
                        'icon' => 'table',
                        'name' => 'Sarana Operasi Lainnya',
                        'route' => 'pengoperasian.sarana.operasi.lain',
                        'route_name' => 'pengoperasian.sarana.operasi.lain',
                    ],
                ]
            ],
            [
                'access' => false,
                'icon' => 'users',
                'name' => 'User',
                'route' => 'parent',
                'route_name' => 'account',
                'expand' => false,
                'children' => [
                    [
                        'access' => false,
                        'icon' => 'table',
                        'name' => 'Profile',
                        'route' => 'account.profile',
                        'route_name' => 'account.profile',
                    ],
                    [
                        'access' => false,
                        'icon' => 'table',
                        'name' => 'Reset Password',
                        'route' => 'account.password',
                        'route_name' => 'account.password',
                    ],
                ]
            ],
        ];
    }

    private function getPublicMenu()
    {
        $divisions = Division::whereNull('deleted_at')->orderBy('seq', 'asc')->get();
        $profileMenu = [];
        foreach ($divisions as $div) {
            $profileMenu[] = [
                'access' => false,
                'icon' => 'toggle-off',
                'name' => $div->name,
                'route' => $div->slug,
                'url' => "/profile/$div->slug",
            ];
        }
        $saranaOperasi = [];
        foreach ($divisions as $div) {
            $saranaOperasi[] = [
                'access' => false,
                'icon' => 'toggle-off',
                'name' => $div->name,
                'route' => $div->slug,
                'url' => "/sarana-operasi/$div->slug",
            ];
        }
        $persebaran = [];
        foreach ($divisions as $div) {
            $persebaran[] = [
                'access' => false,
                'icon' => 'toggle-off',
                'name' => $div->name,
                'route' => $div->slug,
                'url' => "/persebaran/$div->slug",
            ];
        }
        $data = [
            [
                'access' => false,
                'name' => 'Home',
                'route' => 'home',
                'route_name' => 'home',
                'expand' => false,
            ],
            [
                'access' => false,
                'icon' => 'table',
                'name' => 'Pengawasan',
                'route' => 'parent',
                'route_name' => 'pengawasan',
                'expand' => false,
                'children' => [
                    [
                        'access' => false,
                        'icon' => 'table',
                        'name' => 'Import',
                        'route' => 'pub.pengawasan.import',
                        'url' => '/pengawasan/import',
                    ],
                    [
                        'access' => false,
                        'icon' => 'table',
                        'name' => 'Eksport',
                        'route' => 'pub.pengawasan.export',
                        'url' => '/pengawasan/export',
                    ],
                    [
                        'access' => false,
                        'icon' => 'table',
                        'name' => 'Cukai MMEA',
                        'route' => 'pub.pengawasan.cukai.mmea',
                        'url' => '/pengawasan/cukai/mmea',
                    ],
                    [
                        'access' => false,
                        'icon' => 'table',
                        'name' => 'Cukai HT',
                        'route' => 'pub.pengawasan.cukai.ht',
                        'url' => '/pengawasan/cukai/ht',
                    ],
                    [
                        'access' => false,
                        'icon' => 'table',
                        'name' => 'Cukai EA',
                        'route' => 'pub.pengawasan.cukai.ea',
                        'url' => '/pengawasan/cukai/ea',
                    ],
                    [
                        'access' => false,
                        'icon' => 'table',
                        'name' => 'Penindakan',
                        'route' => 'pub.pengawasan.penindakan',
                        'url' => '/pengawasan/penindakan',
                    ],
                ]
            ],
            [
                'access' => false,
                'name' => 'Profil',
                'route' => 'parent',
                'route_name' => 'profile',
                'expand' => false,
                'children' => $profileMenu
            ],
            [
                'access' => false,
                'name' => 'Peta Kerawanan',
                'route' => 'parent',
                'route_name' => 'persebaran',
                'expand' => false,
                'children' => $persebaran
            ],
            [
                'access' => false,
                'name' => 'Sarana Operasi',
                'route' => 'parent',
                'route_name' => 'sarana-operasi',
                'expand' => false,
                'children' => $saranaOperasi
            ],
        ];

        return $data;
    }
}
