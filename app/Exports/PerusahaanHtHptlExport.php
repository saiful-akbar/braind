<?php

namespace App\Exports;

use App\Models\MenuUser;
use Illuminate\View\View;
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

class PerusahaanHtHptlExport implements FromView, WithStyles, ShouldAutoSize
{
    use Exportable;

    private array $columns = [
        'kantor_id',
        'kantor_nama',
        'nama_perusahaan',
        'nppbkc',
        'jumlah_ck',
        'jenis_bkc',
        'jumlah',
        'jumlah_cukai',
        'tanggal_input',
        'deleted_at',
    ];

    private string $order = 'asc';
    private string $orderBy = 'kantor_nama';

    private $query;

    /**
     * Constructor method
     */
    public function __construct(private Request $request, private MenuUser $access)
    {
        $columns = [
            'perusahaan_ht_hptl.*',
            'kantor.nama as kantor_nama',
        ];

        // Buat query select data perusahaan_ht_hptl dan join dengan data kantor.
        // lalu filter berdasarkan tanggal_input dengan where between
        $this->query = PerusahaanHtHptl::select($columns)
            ->leftJoin('kantor', 'perusahaan_ht_hptl.kantor_id', '=', 'kantor.id')
            ->whereBetween('perusahaan_ht_hptl.tanggal_input', [
                $request->query('start_period', date('Y-m-01')),
                $request->query('end_period', date('Y-m-d')),
            ]);

        // jika ada query string "status" dengan nilai "dihapus"
        // tampilkan hanya data yang telah dihapus
        if ($access->destroy && $request->query('status') == 'dihapus') {
            $this->query->onlyTrashed();
        }

        // jika user sebegai admin tampilkan semua data perusahaan.
        // jika user bukan admin tampilkan hanya data perusahaan dengan kantor_id
        // yang sama dengan kantor_id yang dimiliki user.
        if (!user()->admin) {
            $this->query->where('perusahaan_ht_hptl.kantor_id', user()->kantor_id);
        }

        // jika ada query string "search" tambahkan query where like
        if (!empty($request->query('search'))) {
            $this->query->where(function (Builder $query) use ($request): void {
                $query->where('perusahaan_ht_hptl.nama_perusahaan', 'like', '%' . $request->query('search') . '%')
                    ->orWhere('kantor.nama', 'like', '%' . $request->query('search') . '%');
            });
        }

        // Periksa jika ada query string "order_by" ubah properti "$orderBy"
        if (in_array($request->query('order_by'), $this->columns)) {
            $this->orderBy = $request->query('order_by');
        }

        // Periksa jika ada query string "order" ubah properti "$order"
        if ($request->query('order') === 'desc') {
            $this->order = 'desc';
        }

        return $this->query->orderBy($this->orderBy, $this->order);
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
            "A1:I{$count}" => [
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
        return view('exports.perusahaan-ht-hptl', [
            'data' => $this->query->get(),
        ]);
    }
}
