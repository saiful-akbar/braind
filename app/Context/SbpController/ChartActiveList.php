<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\SbpController;

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
            "SELECT sum(amount) AS amount, sum(follow_up) follow_up, division_id, d.name
            FROM sbps s
            JOIN divisions d
                ON d.id = s.division_id
            WHERE s.input_date LIKE '$now%'
                $division
            GROUP BY division_id, d.name
            ORDER BY d.created_at DESC"
        );
        $labels = [];
        $amt = [];
        $fu = [];
        foreach ($data as $item) {
            $labels[] = $item->name;
            $amt[] = (int)$item->amount;
            $fu[] = (int)$item->follow_up;
        }

        return [
            'labels' => $labels,
            'datasets' => [
                [
                    'label' => 'Jumlah SBP',
                    'backgroundColor' => '#4473c5',
                    'data' => $amt
                ],
                [
                    'label' => 'Tindak Lanjut',
                    'backgroundColor' => '#ed7d31',
                    'data' => $fu
                ],
            ]
        ];
    }
}
