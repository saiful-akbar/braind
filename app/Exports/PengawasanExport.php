<?php

namespace App\Exports;

use App\Models\MenuUser;
use Illuminate\View\View;
use App\Models\Pengawasan;
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

class PengawasanExport implements FromView, WithStyles, ShouldAutoSize
{
    use Exportable;

    private array $types = [
        'Cukai EA',
        'Cukai HT',
        'Cukai MMEA',
        'Export',
        'Import',
    ];

    private array $columns = [
        'kantor_id',
        'kantor_nama',
        'tipe',
        'sbp',
        'kantor',
        'nilai_barang',
        'total_kerugian',
        'potensi_kerugian',
        'tindak_lanjut',
        'tanggal_input',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    private string $orderBy = 'kantor_nama';
    private string $order = 'asc';

    private $query;

    /**
     * Constructor method
     */
    public function __construct(private Request $request, private MenuUser $access)
    {
        // daftar kolom yang akan diambil atau ditampilkan.
        $columns = [
            'pengawasan.*',
            'kantor.id as kantor_id',
            'kantor.nama as kantor_nama',
        ];

        // Ambil data pada tabel pengawasan dan join dengan tabel kantor.
        // lalu buat filter berdasarkan periode waktu.
        $this->query = Pengawasan::select($columns)
            ->leftJoin('kantor', 'pengawasan.kantor_id', '=', 'kantor.id')
            ->whereBetween('pengawasan.tanggal_input', [
                $request->query('start_period'),
                $request->query('end_period'),
            ]);

        // Periksa jika user yang sedang login bukan sebagai admin tampilkan
        // hanya data perusahaan yang sesuai dengan kantor yang dimiliki user.
        // Jika user sebagai admin tampilkan semua data.
        if (!user()->admin) {
            $this->query->where('kantor.id', user()->kantor_id);
        }

        // Periksa request type
        if (in_array($request->query('type'), $this->types)) {
            $this->query->where('pengawasan.tipe', $request->query('type'));
        }

        // Periksa jika ada request "status" dengan nilai "dihapus"
        // dan user yang sedang login memiliki akses "destroy" (hapus permanen)
        // tampilkan hanya data yang sudah dihapus saja.
        if ($access->destroy && $request->query('status', 'aktif') == 'dihapus') {
            $this->query->onlyTrashed();
        }

        // Periksa jika ada request "search" untuk pencarian data
        // tambahkan query where like.
        if (!empty($request->query('search'))) {
            $this->query->where(function (Builder $query) use ($request): void {
                $search = $request->query('search');

                $query->where('kantor.nama', 'like', "%{$search}%")
                    ->orWhere('pengawasan.kantor', 'like', "%{$search}%")
                    ->orWhere('pengawasan.sbp', 'like', "%{$search}%")
                    ->orWhere('pengawasan.tindak_lanjut', 'like', "%{$search}%");
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
                ],
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => Border::BORDER_THIN,
                        'color' => [
                            'rgb' => '000000'
                        ],
                    ],
                ],
            ],

            // style untuk semua cell
            "A1:J{$count}" => [
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
        return view('exports.pengawasan-export', [
            'data' => $this->query->get(),
        ]);
    }
}
