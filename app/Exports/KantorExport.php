<?php

namespace App\Exports;

use App\Models\Kantor;
use App\Models\MenuUser;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Alignment;

class KantorExport implements FromView, WithStyles, ShouldAutoSize
{
    use Exportable;

    private array $columns = [
        'id',
        'nama',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    private string $orderBy = 'nama';
    private string $order = 'asc';

    private $query;

    /**
     * Construct method
     */
    public function __construct(Request $request, MenuUser $access)
    {
        $query = Kantor::select($this->columns);

        // periksa apakah ada request untuk menampilkan data yang sudah dihapus,
        // dan periksa juga apakah user memiliki akses "destroy" atau tidak
        if ($access->destroy && $request->status == 'dihapus') {
            $query->onlyTrashed();
        }

        // periksa apakah ada request untuk sortir by kolom.
        if (in_array($request->order_by, $this->columns)) {
            $this->orderBy = $request->order_by;
        }

        // periksa apakah ada request untuk sortir kolom
        if ($request->order == 'desc') {
            $this->order = 'desc';
        }

        // periksa apakah ada request pencarian
        if ($request->search) {
            $query->where('nama', 'like', "%{$request->search}%");
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
            "A1:C{$count}" => [
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
        return view('exports.kantor-export', [
            'kantor' => $this->query->get(),
        ]);
    }
}
