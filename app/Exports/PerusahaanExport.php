<?php

namespace App\Exports;

use App\Models\MenuUser;
use Illuminate\View\View;
use App\Models\Perusahaan;
use Illuminate\Http\Request;
use App\Models\PerusahaanHtHptl;
use Maatwebsite\Excel\Concerns\FromView;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use Illuminate\Database\Eloquent\Builder;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class PerusahaanExport implements FromView, WithStyles, ShouldAutoSize
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
     * Constructor method
     */
    public function __construct(Request $request, MenuUser $access)
    {
        // Ambil semua kolom pada data 
        $this->query = Perusahaan::select($this->columns);

        // Jika dad request "status" dengan nilai "dihapus" dan user login
        // memiliki akses destroy maka tampilkan data yang sudah dihapus.
        if ($access->destroy && $request->query('status', 'aktif') == 'dihapus') {
            $this->query->onlyTrashed();
        }

        // Periksa jika ada request "search" untuk pencarian data
        // tambahkan query where like.
        if (!empty($request->query('search'))) {
            $this->query->where(function (Builder $query) use ($request): void {
                $query->where('id', 'like', '%' . $request->query('search') . '%')
                    ->orWhere('nama', 'like', '%' . $request->query('search') . '%');
            });
        }

        // Periksa jika ada request "order_by" ubah properti $orderBy
        if (in_array($request->query('order_by'), $this->columns)) {
            $this->orderBy = $request->query('order_by');
        }

        // Periksa jika ada request "order" obah properti pada $order
        if ($request->query('order') == 'desc') {
            $this->order = 'desc';
        }

        // Tambahkan query order
        $this->query->orderBy($this->orderBy, $this->order);
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
            "A1:D{$count}" => [
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => Border::BORDER_THIN,
                        'color' => [
                            'rgb' => '000000'
                        ],
                    ],
                ],
            ],
        ];
    }

    /**
     * Export from view
     */
    function view(): View
    {
        return view('exports.perusahaan-export', [
            'data' => $this->query->get(),
        ]);
    }
}
