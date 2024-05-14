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
            'nomor'           => 'required|string|max:50',
            'bulan_pelaporan' => 'required|in:' . implode(',', $month),
            'tahun_pelaporan' => 'required|date_format:Y',
            'tanggal_cetak'   => 'required|date_format:Y-m-d',
        ];
    }

    /**
     * Mengambil data laporan sarana operasi
     *
     * @return Kantor
     */
    private function getData(): Kantor
    {

        return Kantor::select('id', 'nama')
            ->with([
                'operasiKapalPatroli'       => fn (HasMany $query) => $query->where('cetak', true),
                'operasiAlatTelekomunikasi' => fn (HasMany $query) => $query->where('cetak', true),
                'operasiSenjataApi'         => fn (HasMany $query) => $query->where('cetak', true),
                'operasiAlatPemindai'       => fn (HasMany $query) => $query->where('cetak', true),
                'operasiLainnya'            => fn (HasMany $query) => $query->where('cetak', true),
            ])
            ->where('id', user()->kantor_id)
            ->first();
    }

    /**
     * Cetak PDF Laporan Pengoperasian Sarana Operasi (LPSO)
     *
     * @return Response
     */
    public function printPdf(): Response
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
