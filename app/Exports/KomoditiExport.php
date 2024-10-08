<?php

namespace App\Exports;

use App\Models\MenuUser;
use App\Models\Komoditi;
use Illuminate\View\View;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Concerns\FromView;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class KomoditiExport implements FromView, ShouldAutoSize, WithStyles
{
    use Exportable;

    private array $columns = [
        'id',
        'kode',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    private string $orderBy = 'kode';
    private string $order = 'asc';

    private $query;

    /**
     * Construct method
     */
    public function __construct(Request $request, MenuUser $access)
    {
        $query = Komoditi::select($this->columns);

        // periksa apakah ada request untuk menampilkan data yang sudah dihapus,
        // dan periksa juga apakah user memiliki akses "destroy" atau tidak
        if ($access->destroy && $request->status == 'dihapus') {
            $query->onlyTrashed();
        }

        // periksa apakah ada request untuk sortir berdasarkan kolom.
        if (in_array($request->order_by, $this->columns)) {
            $this->orderBy = $request->order_by;
        }

        // periksa apakah ada request untuk sortir kolom
        if ($request->order == 'desc') {
            $this->order = 'desc';
        }

        // periksa apakah ada request pencarian
        if ($request->search) {
            $query->where('kode', 'like', "%{$request->search}%");
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
        return view('exports.komoditi-export', [
            'komoditi' => $this->query->get(),
        ]);
    }
}
