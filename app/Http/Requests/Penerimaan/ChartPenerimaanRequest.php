<?php

namespace App\Http\Requests\Penerimaan;

use App\Models\Kantor;
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
        if ($this->query('kantor') != 'all') {
            $kantorRules = "exists:kantor,id";
        } else {
            $kantorRules = 'in:all';
        }

        return [
            'tab' => 'in:perkantor,semua',
            'year' => 'nullable|date_format:Y',
            'month' => 'nullable|date_format:m',
            'kantor' => $kantorRules
        ];
    }

    /**
     * Mengambil data chart untuk semua kantor
     *
     * @return array
     */
    private function getChartByAllKantor(): array
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

        // jika ada request kantor, filter data berdasarkan id kantor yang dipilih
        if ($this->query('kantor') != 'all') {
            $query->where('kantor_id', $this->query('kantor'));
        }

        // filter data berdasarkan tahun dan bulan yang di request
        $query->where('tanggal_input', 'like', "{$date}%");

        // buat blueprint untuk dataset grafik
        $data = [
            'series' => [],
            'x_labels' => [
                'Bea Masuk',
                'Bea Keluar',
                'Cukai',
            ],
            // 'x_labels' => [
            //     'Target Bea Masuk',
            //     'Realisasi Bea Masuk',
            //     'Target Bea Keluar',
            //     'Realisasi Bea Keluar',
            //     'Target Cukai',
            //     'Realisasi Cukai',
            // ]
        ];

        foreach ($query->get() as $value) {
            // $data['series'][0]['data'][0] = (float) $value->target_bea_masuk;
            // $data['series'][0]['data'][1] = (float) $value->realisasi_bea_masuk;
            // $data['series'][0]['data'][2] = (float) $value->target_bea_keluar;
            // $data['series'][0]['data'][3] = (float) $value->realisasi_bea_keluar;
            // $data['series'][0]['data'][4] = (float) $value->target_cukai;
            // $data['series'][0]['data'][5] = (float) $value->realisasi_cukai;

            $data['series'][0]['data'][0] = (float) $value->target_bea_masuk;
            $data['series'][0]['data'][1] = (float) $value->target_bea_keluar;
            $data['series'][0]['data'][2] = (float) $value->target_cukai;
            $data['series'][0]['label'] = 'Target';
            $data['series'][0]['id'] = 'target';

            $data['series'][1]['data'][0] = (float) $value->realisasi_bea_keluar;
            $data['series'][1]['data'][1] = (float) $value->realisasi_bea_keluar;
            $data['series'][1]['data'][2] = (float) $value->realisasi_cukai;
            $data['series'][1]['label'] = 'Realisasi';
            $data['series'][1]['id'] = 'realisasi';
        }

        return $data;
    }

    /**
     * Ambil data chart berdasarkan kantor
     *
     * @return array
     */
    private function getChartByKantor(): mixed
    {
        $year = $this->query('year');
        $month = $this->query('month');
        $date = "$year-$month";

        $query = Kantor::select([
            'kantor.nama AS kantor_nama',
            DB::raw('SUM(penerimaan.target_bea_masuk) AS target_bea_masuk'),
            DB::raw('SUM(penerimaan.realisasi_bea_masuk) AS realisasi_bea_masuk'),
            DB::raw('SUM(penerimaan.target_bea_keluar) AS target_bea_keluar'),
            DB::raw('SUM(penerimaan.realisasi_bea_keluar) AS realisasi_bea_keluar'),
            DB::raw('SUM(penerimaan.target_cukai) AS target_cukai'),
            DB::raw('SUM(penerimaan.realisasi_cukai) AS realisasi_cukai'),
        ])
            ->join('penerimaan', 'penerimaan.kantor_id', '=', 'kantor.id')
            ->where('penerimaan.tanggal_input', 'like', "$date%");

        // Jika ada request kantor, filter data berdasarkan id kantor yang dipilih
        if ($this->query('kantor') != 'all') {
            $query->where('kantor.id', $this->query('kantor'));
        }

        // Tambahkan query group by
        $query->groupBy('kantor.nama');

        // buat variable untuk data kosong.
        $data = [
            'series' => [],
            'x_labels' => []
        ];

        // isikan valiable $data dari hasil query.
        foreach ($query->get() as $value) {
            $data['series'][0]['data'][] = (float) $value->target_bea_masuk;
            $data['series'][0]['label'] = 'Target Bea Masuk';
            $data['series'][0]['id'] = 'target_bea_masuk';

            $data['series'][1]['data'][] = (float) $value->realisasi_bea_masuk;
            $data['series'][1]['label'] = 'Realisasi Bea Masuk';
            $data['series'][1]['id'] = 'realisasi_bea_masuk';

            $data['series'][2]['data'][] = (float) $value->target_bea_keluar;
            $data['series'][2]['label'] = 'Target Bea Keluar';
            $data['series'][2]['id'] = 'target_bea_keluar';

            $data['series'][3]['data'][] = (float) $value->realisasi_bea_keluar;
            $data['series'][3]['label'] = 'Realisasi Bea Keluar';
            $data['series'][3]['id'] = 'realisasi_bea_keluar';

            $data['series'][4]['data'][] = (float) $value->target_cukai;
            $data['series'][4]['label'] = 'Target Cukai';
            $data['series'][4]['id'] = 'target_cukai';

            $data['series'][5]['data'][] = (float) $value->realisasi_cukai;
            $data['series'][5]['label'] = 'Realisasi Cukai';
            $data['series'][5]['id'] = 'realisasi_cukai';

            $data['x_labels'][] = $value->kantor_nama;
        }

        return $data;
    }

    /**
     * ambil data penerimaan untuk chart pada dashboard.
     *
     * @return array
     */
    public function read(): mixed
    {
        if ($this->query('tab') == 'perkantor' && user()->admin) {
            return $this->getChartByKantor();
        }

        return $this->getChartByAllKantor();
    }
}
