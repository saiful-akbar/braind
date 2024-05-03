<?php

namespace App\Http\Requests\Report;

use App\Models\Kantor;
use Illuminate\Http\Response;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\OperasiKapalPatroli;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LpsoReportRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $month = [
            'Januari',
            'Februari',
            'Maret',
            'April',
            'Mei',
            'Juni',
            'Juli',
            'Agustus',
            'September',
            'Oktober',
            'November',
            'Desember',
        ];

        return [
            'nomor' => 'required|string|max:50',
            'bulan_pelaporan' => 'required|in:' . implode(',', $month),
            'tahun_pelaporan' => 'required|date_format:Y',
            'tanggal_cetak' => 'required|date_format:Y-m-d',
        ];
    }

    /**
     * Mengambil data laporan sarana operasi
     *
     * @return Kantor
     */
    private function getData(): Kantor
    {
        $columns = [
            'operasi_kapal_patroli' => [
                'kantor_id',
                'nomor_lambung',
                'kondisi_aktif',
                'nomor_spb',
                'tanggal_spb',
                'penerbit_spb',
                'jumlah_hari',
                'catatan',
            ],
            'operasi_alat_telekomunikasi' => [
                'kantor_id',
                'kode_barang',
                'nup',
                'nama_barang',
                'jenis_perangkat',
                'harga_perolehan',
                'tahun_perolehan',
                'merek',
                'tipe',
                'rentang_frekuensi',
                'teknologi_digital',
                'kondisi',
                'status',
                'lokasi_penempatan',
                'catatan',
            ],
            'operasi_senjata_api' => [
                'kantor_id',
                'jenis_kaliber',
                'nomor_senjata',
                'nomor_buku_pas',
                'masa_berlaku',
                'kondisi',
                'nama_pemegang_senjata',
                'pangkat_pemegang_senjata',
                'jabatan_pemegang_senjata',
                'jumlah_amunisi',
                'catatan',
            ],
            'operasi_alat_pemindai' => [
                'kantor_id',
                'pemindai',
                'nama_alat',
                'ukuran',
                'merek',
                'tipe',
                'nomor_seri',
                'tampilan',
                'tahun_perolehan',
                'kondisi',
                'jam_operasi',
                'jam_pemindaian',
                'jumlah_pemindaian',
                'hasil_keluaran',
                'catatan',
            ],
            'operasi_lainnya' => [
                'kantor_id',
                'jenis_operasi',
                'tipe',
                'merek',
                'lokasi_penempatan',
                'kondisi',
                'catatan',
            ],
        ];

        return Kantor::findOrFail(user()->kantor_id)->select('id', 'nama')
            ->with([
                'operasiKapalPatroli' => function (HasMany $query) use ($columns) {
                    $query->select($columns['operasi_kapal_patroli'])->where('cetak', true);
                },
                'operasiAlatTelekomunikasi' => function (HasMany $query) use ($columns) {
                    $query->select($columns['operasi_alat_telekomunikasi'])->where('cetak', true);
                },
                'operasiSenjataApi' => function (HasMany $query) use ($columns) {
                    $query->select($columns['operasi_senjata_api'])->where('cetak', true);
                },
                'operasiAlatPemindai' => function (HasMany $query) use ($columns) {
                    $query->select($columns['operasi_alat_pemindai'])->where('cetak', true);
                },
                'operasiLainnya' => function (HasMany $query) use ($columns) {
                    $query->select($columns['operasi_lainnya'])->where('cetak', true);
                },
            ])->first();
    }

    /**
     * Cetak PDF Laporan Pengoperasian Sarana Operasi (LPSO)
     *
     * @return Response
     */
    public function printPdf(): mixed
    {
        $data = [
            ...$this->query(),
            'data' => $this->getData(),
        ];

        return Pdf::loadView('reports.lpso', $data)
            ->setPaper('a4', 'landscape')
            ->stream();
    }
}
