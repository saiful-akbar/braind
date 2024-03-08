<?php

namespace App\Http\Requests\Sbp;

use App\Models\Sbp;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Http\FormRequest;

class ChartSbpRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * ambil data untuk chart
     *
     * @return array
     */
    public function getData(): mixed
    {

        // Ambil jumlah data pada kolom "jumlah", "tindak_lanjut" dan bulan
        // dari "tanggal_input" berdasarkan tanggal input yang sesuai dengan tahun saat ini.
        $query = Sbp::select(
            DB::raw('SUM(jumlah) AS jumlah'),
            DB::raw('SUM(tindak_lanjut) AS tindak_lanjut'),
            DB::raw('DATE_FORMAT(tanggal_input, "%c") AS bulan')
        );

        // Perikasa jika user bukan sebagai admin
        // ambil hanya data dengan "kantor_id" yang sesuai
        // yang dimiliki oleh user yang sedang login.
        if (!user()->admin) {
            $query->where('kantor_id', '=', user()->kantor_id);
        }

        // filter data berdasarkan tahun saat ini.
        $currentYear = date('Y');
        $query->where('tanggal_input', 'like', "$currentYear%")
            ->groupBy(DB::raw('DATE_FORMAT(tanggal_input, "%c")'));

        // Buat variable $result dengan nilai jumlah dan tindak lanjut
        // yang berisi data array kosong.
        $result = [
            'tahun' => (int) $currentYear,
            'jumlah' => [],
            'tindak_lanjut' => [],
        ];

        // isikan data jumlah dan tindak lanjut pada variable $result
        // dengan nilai 0 sebanyak 12 index.
        for ($i = 1; $i <= 12; $i++) {
            $result['jumlah'][] = 0;
            $result['tindak_lanjut'][] = 0;
        }

        // timpa data jumlah dan tindak_lanjut pada variable $result
        // dengan nilai hasil query sesuai dengan index yang sama dengan
        // bulan yang dihasilkan dari query.
        foreach ($query->get() as $data) {
            $result['jumlah'][(int) $data->bulan - 1] = (float) $data->jumlah;
            $result['tindak_lanjut'][(int) $data->bulan - 1] = (float) $data->tindak_lanjut;
        }

        return $result;
    }
}
