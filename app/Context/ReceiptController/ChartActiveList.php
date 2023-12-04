<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\ReceiptController;

use App\Context\Reader;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ChartActiveList implements Reader
{
    public function read()
    {
        $user = auth()->user();
        $division = '';
        if ($user && $user->division_id) {
            $division = " AND s.division_id = " . $user->division_id;
        }
        $now = Carbon::now()->format('Y-m');
        $data = DB::select(
            "SELECT
            sum(target_import_duty) as target_import_duty,
            sum(target_export_duty) as target_export_duty,
            sum(target_tax) as target_tax,
            sum(realization_import_duty) as realization_import_duty,
            sum(realization_export_duty) as realization_export_duty,
            sum(realization_tax) as realization_tax, division_id, d.name
            FROM receipts s
            JOIN divisions d
                ON d.id = s.division_id
            WHERE s.created_at LIKE '$now%'
                $division
            GROUP BY division_id, d.name
            ORDER BY d.created_at DESC"
        );
        $labels = [];
        $trgt_id = [];
        $trgt_ed = [];
        $trgt_t = [];
        $real_id = [];
        $real_ed = [];
        $real_t = [];
        foreach ($data as $item) {
            $labels[] = $item->name;
            $trgt_id[] = (int)$item->target_import_duty;
            $trgt_ed[] = (int)$item->target_export_duty;
            $trgt_t[] = (int)$item->target_tax;
            $real_id[] = (int)$item->realization_import_duty;
            $real_ed[] = (int)$item->realization_export_duty;
            $real_t[] = (int)$item->realization_tax;
        }

        return [
            'labels' => $labels,
            'datasets' => [
                [
                    'label' => 'Target Bea Masuk',
                    'backgroundColor' => '#4473c5',
                    'data' => $trgt_id
                ],
                [
                    'label' => 'Realisasi Bea Masuk',
                    'backgroundColor' => '#4473c5',
                    'data' => $real_id
                ],
                [
                    'label' => 'Target Bea Keluar',
                    'backgroundColor' => '#ed7d31',
                    'data' => $trgt_ed
                ],
                [
                    'label' => 'Realisasi Bea Keluar',
                    'backgroundColor' => '#ed7d31',
                    'data' => $real_ed
                ],
                [
                    'label' => 'Target Cukai',
                    'backgroundColor' => '#a5a5a5',
                    'data' => $trgt_t
                ],
                [
                    'label' => 'Realisasi Cukai',
                    'backgroundColor' => '#a5a5a5',
                    'data' => $real_t
                ],
            ]
        ];
    }
}
