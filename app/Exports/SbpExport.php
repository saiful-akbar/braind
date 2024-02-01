<?php

namespace App\Exports;

use App\Models\Sbp;
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

class SbpExport implements FromView, WithStyles, ShouldAutoSize
{
    use Exportable;

    private array $columns = [
        'kantor_id',
        'kantor_nama',
        'id',
        'jumlah',
        'tindak_lanjut',
        'tanggal_input',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    private string $orderBy = 'updated_at';
    private string $order = 'asc';

    private $query;

    /**
     * Constructor method
     */
    public function __construct(private Request $request, private MenuUser $access)
    {
        $columns = [
            'sbp.id',
            'sbp.jumlah',
            'sbp.tindak_lanjut',
            'sbp.tanggal_input',
            'sbp.created_at',
            'sbp.updated_at',
            'sbp.deleted_at',
            'kantor.id as kantor_id',
            'kantor.nama as kantor_nama',
        ];

        // ambil data SBP dan join dengan tabel users dan kantor.
        $this->query = Sbp::select($columns)
            ->leftJoin('kantor', 'sbp.kantor_id', '=', 'kantor.id')
            ->whereBetween('sbp.tanggal_input', [
                $request->query('start_period'),
                $request->query('end_period'),
            ]);

        // periksa role user.
        // jika bukan sebagai admin tampilkan hanya data yang sesuai dengan kantonya.
        // jika user sebagai admin tampilkan semua data.
        if (!user()->admin) {
            $this->query->where('kantor.id', user()->kantor_id);
        }

        // jika ada request status dengan nilai "dihapus" dan user
        // memiliki akses destroy, ambil hanya data yang telah dihapus saja.
        if ($this->request->query('status') == 'dihapus' && $this->access->destroy) {
            $this->query->onlyTrashed();
        }

        // jika ada request search tambahkan query pencarian
        if (!empty($this->request->query('search'))) {
            $this->query->where(function (Builder $query): void {
                $query->where('sbp.id', 'like', '%' . $this->request->query('search') . '%')
                    ->orWhere('kantor.id', 'like', '%' . $this->request->query('search') . '%')
                    ->orWhere('kantor.nama', 'like', '%' . $this->request->query('search') . '%');
            });
        }

        // Periksa jika ada request "order_by"
        if (in_array($this->request->query('order_by'), $this->columns)) {
            $this->orderBy = $this->request->query('order_by');
        }

        // Periksa jika ada request "order"
        if ($this->request->query('order') === 'desc') {
            $this->order = 'desc';
        }

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
            "A1:G{$count}" => [
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
        return view('exports.sbp-export', [
            'sbp' => $this->query->get(),
        ]);
    }
}
