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
     * ambil data penerimaan untuk chart pada dashboard.
     *
     * @return array
     */
    public function read(): array
    {
        $currentYear = date('Y');

        // select data peenrimaan berdasarkan tahun saat ini.
        $query = Penerimaan::select(
            DB::raw('sum(target_bea_masuk) as target_bea_masuk'),
            DB::raw('sum(target_bea_keluar) as target_bea_keluar'),
            DB::raw('sum(target_cukai) as target_cukai'),
            DB::raw('sum(realisasi_bea_masuk) as realisasi_bea_masuk'),
            DB::raw('sum(realisasi_bea_keluar) as realisasi_bea_keluar'),
            DB::raw('sum(realisasi_cukai) as realisasi_cukai'),
            DB::raw('date_format(tanggal_input, "%c") AS bulan')
        )->where('tanggal_input', 'like', "$currentYear%");

        // periksa jika user bukan sebagai admin, ambil data
        // berdasarkan "kantor_id" yang sesuai dengan "kantor_id"
        // yang dimiliki user.
        if (!user()->admin) {
            $query->where('kantor_id', user()->kantor_id);
        }

        // simpan hasil query.
        $data = $query->groupBy(DB::raw('date_format(tanggal_input, "%c")'))->get();

        // buat blueprint untuk dataset grafik
        $dataset = [
            [
                'column' => 'target_bea_masuk',
                'label' => 'Target Bea Masuk',
                'data' => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ],
            [
                'column' => 'target_bea_keluar',
                'label' => 'Target Bea Keluar',
                'data' => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ],
            [
                'column' => 'target_cukai',
                'label' => 'Target Cukai',
                'data' => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ],
            [
                'column' => 'realisasi_bea_masuk',
                'label' => 'Realisasi Bea Masuk',
                'data' => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ],
            [
                'column' => 'realisasi_bea_keluar',
                'label' => 'Realisasi Bea Keluar',
                'data' => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ],
            [
                'column' => 'realisasi_cukai',
                'label' => 'Realisasi Cukai',
                'data' => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ],
        ];

        $result = $dataset;

        // isikan $result dengan data hasil query sesuai dengan posisi bulannya.
        foreach ($data as $penerimaan) {
            foreach ($dataset as $key => $value) {
                switch ($value['column']) {
                    case 'target_bea_masuk':
                        $result[$key]['data'][(int) $penerimaan->bulan - 1] = $penerimaan->target_bea_masuk;
                        break;

                    case 'target_bea_keluar':
                        $result[$key]['data'][(int) $penerimaan->bulan - 1] = $penerimaan->target_bea_keluar;
                        break;

                    case 'target_cukai':
                        $result[$key]['data'][(int) $penerimaan->bulan - 1] = $penerimaan->target_cukai;
                        break;

                    case 'realisasi_bea_masuk':
                        $result[$key]['data'][(int) $penerimaan->bulan - 1] = $penerimaan->realisasi_bea_masuk;
                        break;

                    case 'realisasi_bea_keluar':
                        $result[$key]['data'][(int) $penerimaan->bulan - 1] = $penerimaan->realisasi_bea_keluar;
                        break;

                    case 'realisasi_cukai':
                        $result[$key]['data'][(int) $penerimaan->bulan - 1] = $penerimaan->realisasi_cukai;
                        break;

                    default:
                        $result[$key]['data'][(int) $penerimaan->bulan - 1] = 0;
                        break;
                }

                unset($result[$key]['column']);
            }
        }

        return $result;
    }
}
