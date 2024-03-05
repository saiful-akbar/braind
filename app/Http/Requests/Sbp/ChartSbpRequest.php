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

    public function getChart(): mixed
    {
        $currentYear = date('Y');
        $kantorId = user()->kantor_id;

        $result = Sbp::select(
            DB::raw('SUM(jumlah) AS jumlah'),
            DB::raw('SUM(tindak_lanjut) AS tindak_lanjut'),
            DB::raw('DATE_FORMAT(tanggal_input, "%b") AS bulan'),
        )
            ->where('kantor_id', '=', $kantorId)
            ->where('tanggal_input', 'like', "%$currentYear%")
            ->groupBy('tanggal_input')
            ->orderBy('tanggal_input', 'asc')
            ->get();

        return $result;
    }
}
