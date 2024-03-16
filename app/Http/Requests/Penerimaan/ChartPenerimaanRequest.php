<?php

namespace App\Http\Requests\Penerimaan;

use App\Models\Penerimaan;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Http\FormRequest;

class ChartPenerimaanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Aturan validasi
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'year' => 'nullable|date_format:Y',
            'month' => 'nullable|date_format:m',
        ];
    }

    /**
     * ambil data penerimaan untuk chart pada dashboard.
     *
     * @return array
     */
    public function read(): array
    {
        $year = !empty($this->year) ? $this->year : date('Y');
        $month = !empty($this->month) ? $this->month : date('m');
        $date = "{$year}-{$month}";

        // select data peenrimaan berdasarkan tahun saat ini.
        $query = Penerimaan::select(
            DB::raw('sum(target_bea_masuk) as target_bea_masuk'),
            DB::raw('sum(target_bea_keluar) as target_bea_keluar'),
            DB::raw('sum(target_cukai) as target_cukai'),
            DB::raw('sum(realisasi_bea_masuk) as realisasi_bea_masuk'),
            DB::raw('sum(realisasi_bea_keluar) as realisasi_bea_keluar'),
            DB::raw('sum(realisasi_cukai) as realisasi_cukai'),
        );

        // Jika user bukan sebagai admin, tampilkan hanya data
        // adengan "kantor_id" yang sama yang dimiliki user.
        if (!user()->admin) {
            $query->where('kantor_id', user()->kantor_id);
        }

        // filter data berdasarkan tahun dan bulan yang di request
        $query->where('tanggal_input', 'like', "{$date}%");

        // buat blueprint untuk dataset grafik
        $data = [
            'series' => [],
            'x_labels' => [
                'Target Bea Masuk',
                'Target Bea Keluar',
                'Target Cukai',
                'Realisasi Bea Masuk',
                'Realisasi Bea Keluar',
                'Realisasi Cukai',
            ]
        ];

        foreach ($query->get() as $key => $value) {
            $data['series'][0]['data'][0] = (float) $value->target_bea_masuk;
            $data['series'][0]['data'][1] = (float) $value->target_bea_keluar;
            $data['series'][0]['data'][2] = (float) $value->target_cukai;
            $data['series'][0]['data'][3] = (float) $value->realisasi_bea_masuk;
            $data['series'][0]['data'][4] = (float) $value->realisasi_bea_keluar;
            $data['series'][0]['data'][5] = (float) $value->realisasi_cukai;
        }

        return $data;

        // isikan $result dengan data hasil query sesuai dengan posisi bulannya.
        // foreach ($data as $penerimaan) {
        //     foreach ($dataset as $key => $value) {
        //         switch ($value['column']) {
        //             case 'target_bea_masuk':
        //                 $result[$key]['data'][(int) $penerimaan->bulan - 1] = $penerimaan->target_bea_masuk;
        //                 break;

        //             case 'target_bea_keluar':
        //                 $result[$key]['data'][(int) $penerimaan->bulan - 1] = $penerimaan->target_bea_keluar;
        //                 break;

        //             case 'target_cukai':
        //                 $result[$key]['data'][(int) $penerimaan->bulan - 1] = $penerimaan->target_cukai;
        //                 break;

        //             case 'realisasi_bea_masuk':
        //                 $result[$key]['data'][(int) $penerimaan->bulan - 1] = $penerimaan->realisasi_bea_masuk;
        //                 break;

        //             case 'realisasi_bea_keluar':
        //                 $result[$key]['data'][(int) $penerimaan->bulan - 1] = $penerimaan->realisasi_bea_keluar;
        //                 break;

        //             case 'realisasi_cukai':
        //                 $result[$key]['data'][(int) $penerimaan->bulan - 1] = $penerimaan->realisasi_cukai;
        //                 break;

        //             default:
        //                 $result[$key]['data'][(int) $penerimaan->bulan - 1] = 0;
        //                 break;
        //         }

        //         unset($result[$key]['column']);
        //     }
        // }
    }
}
