<?php

namespace App\Exports;

use App\Models\User;
use App\Models\MenuUser;
use Illuminate\View\View;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Concerns\FromView;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use Illuminate\Database\Eloquent\Builder;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;


class UserExport implements FromView, WithStyles, ShouldAutoSize
{
    use Exportable;

    private array $columns = [
        'kantor_id',
        'kantor_nama',
        'id',
        'username',
        'role',
        'nama_lengkap',
        'jenis_kelamin',
        'tanggal_lahir',
        'tempat_lahir',
        'negara',
        'kota',
        'kode_pos',
        'alamat',
        'telepon',
        'email',
    ];

    private string $orderBy = 'nama_lengkap';
    private string $order = 'asc';

    private $query;

    /**
     * Construct method
     */
    public function __construct(Request $request, MenuUser $access)
    {
        $query = User::select('users.*', 'kantor.nama as kantor_nama')
            ->leftJoin('kantor', 'users.kantor_id', '=', 'kantor.id');

        // periksa apakah ada request untuk menampilkan data yang sudah dihapus,
        // dan periksa juga apakah user memiliki akses "destroy" atau tidak
        if ($access->destroy && $request->status == 'removed') {
            $query->onlyTrashed();
        }

        // periksa apakah ada request pencarian
        if ($request->search) {
            $query->where(function (Builder $query) use ($request): void {
                $query->where('users.nama_lengkap', 'like', "%{$request->search}%")
                    ->where('users.email', 'like', "%{$request->search}%")
                    ->where('users.role', 'like', "%{$request->search}%")
                    ->where('kantor.nama', 'like', "%{$request->search}%");
            });
        }

        // periksa apakah ada request untuk sortir by kolom.
        if (in_array($request->order_by, $this->columns)) {
            $this->orderBy = $request->order_by;
        }

        // periksa apakah ada request untuk sortir kolom
        if ($request->order == 'desc') {
            $this->order = 'desc';
        }

        $this->query = $query->orderBy($this->orderBy, $this->order);
    }

    /**
     * Style cell
     */
    public function styles(Worksheet $sheet): array
    {
        $count = $this->query->count() + 1;

        return [

            // Style untuk baris pertama.
            1 => [
                'font' => [
                    'bold' => true,
                ],
                'fill' => [
                    'fillType' => Fill::FILL_SOLID,
                    'color' => [
                        'rgb' => 'c5daf1',
                    ]
                ],
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_CENTER
                ]
            ],

            // style untuk semua cell
            "A1:O{$count}" => [
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => Border::BORDER_THIN,
                        'color' => [
                            'rgb' => '000000'
                        ],
                    ],
                ],
            ]
        ];
    }

    /**
     * Export from view
     */
    function view(): View
    {
        return view('exports.user-export', [
            'users' => $this->query->get(),
        ]);
    }
}
