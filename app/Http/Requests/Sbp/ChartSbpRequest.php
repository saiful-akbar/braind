<?php

namespace App\Http\Requests\Sbp;

use App\Models\Kantor;
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
     * Aturan validasi
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'tab'   => 'nullable|in:monthly,kantor',
            'year'  => 'nullable|date_format:Y',
            'month' => 'nullable|date_format:m',
        ];
    }

    /**
     * Mengambil data tahun
     *
     * @return string|integer
     */
    public function getDate(): string|int
    {
        $year = date('Y');
        $month = date('m');

        if (!empty($this->year)) {
            $year = $this->year;
        }

        if (!empty($this->month)) {
            $month = $this->month;
        }

        return "{$year}-{$month}";
    }

    /**
     * ambil data chart berdasarkan bulan pada tahun saat ini
     *
     * @return array
     */
    public function getChartByMonth(): array
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

        // filter data berdasarkan tahun yang di request.
        $year = !empty($this->year) ? $this->year : date('Y');
        $query->where('tanggal_input', 'like', "{$year}%");

        // Grouping data berdasarkan bulan dari tanggal_input.
        $query->groupBy(DB::raw('DATE_FORMAT(tanggal_input, "%c")'));

        // Buat variable $result dengan nilai jumlah dan tindak lanjut
        // yang berisi data array kosong.
        $result = [
            'series' => [],
            'x_labels' => [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
        ];

        // isikan data jumlah dan tindak lanjut pada variable $result
        // dengan nilai 0 sebanyak 12 index.
        for ($i = 1; $i <= 12; $i++) {
            $result['series'][0]['data'][] = 0;
            $result['series'][0]['label'] = 'Jumlah';
            $result['series'][0]['id'] = 'jumlah';

            $result['series'][1]['data'][] = 0;
            $result['series'][1]['label'] = 'Tindak Lanjut';
            $result['series'][1]['id'] = 'tindak_lanjut';
        }

        // timpa data jumlah dan tindak_lanjut pada variable $result
        // dengan nilai hasil query sesuai dengan index yang sama dengan
        // bulan yang dihasilkan dari query.
        foreach ($query->get() as $data) {
            $result['series'][0]['data'][(int) $data->bulan - 1] = (float) $data->jumlah;
            $result['series'][1]['data'][(int) $data->bulan - 1] = (float) $data->tindak_lanjut;
        }

        return $result;
    }

    /**
     * AMbil data chart berdasarkan kantor pada tahun saat ini
     *
     * @return mixed
     */
    public function getChartByKantor(): array
    {
        // ambil data sbp dan join dengan tabel kantor.
        // lalu filter datanya dari "tanggal_input" bersadarkan tahun yang direquest.
        $query = Sbp::select(
            'kantor.nama as kantor_nama',
            DB::raw('sum(sbp.jumlah) as sbp_jumlah'),
            DB::raw('sum(sbp.tindak_lanjut) as sbp_tindak_lanjut'),
        )
            ->join('kantor', 'kantor.id', '=', 'sbp.kantor_id')
            ->where('sbp.tanggal_input', 'like', $this->getDate() . '%')
            ->groupBy('kantor.nama');

        // periksa jika user bukan sebagai admin, ambil hanya data
        // yang sesuai dengan kantor_id yang dimiliki user yang sedang login.
        if (!user()->admin) {
            $query->where('kantor.id', '=', user()->kantor_id);
        }

        // buat variable untuk data kosong.
        $data = [
            'series' => [],
            'x_labels' => []
        ];

        // isikan valiable $data dengan hasil query.
        foreach ($query->get() as $key => $value) {
            $data['x_labels'][] = $value->kantor_nama;

            $data['series'][0]['data'][] = (int) $value->sbp_jumlah;
            $data['series'][0]['label'] = 'Jumlah';
            $data['series'][0]['id'] = 'jumlah';

            $data['series'][1]['data'][] = (int) $value->sbp_tindak_lanjut;
            $data['series'][1]['label'] = 'Tidak Lanjut';
            $data['series'][1]['id'] = 'tindak_lanjut';
        }

        return $data;
    }

    public function read(): mixed
    {
        if ($this->tab == 'kantor') {
            return $this->getChartByKantor();
        }

        return $this->getChartByMonth();
    }
}
