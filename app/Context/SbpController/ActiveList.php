<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\SbpController;

use App\Context\HasExportExcel;
use App\Context\HasPaginate;
use App\Context\Reader;
use App\Models\Sbp;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ActiveList implements Reader, FromCollection, WithHeadings
{
    use HasPaginate;

    public function __construct(Request $request)
    {
        $this->request = $request;
        $this->data = $this->data()
            ->select([
                'sbps.*', 'u.name as user_name'
            ]);
    }

    public function collection()
    {
        return $this->data()
            ->select([
                'd.name as division_name', 'sbps.amount', 'sbps.follow_up',
                'sbps.input_date', 'u.name as user_name'
            ])
            ->get();
    }

    private function data()
    {
        $user = auth()->user();
        if (is_null($user)) {
            throw new \Exception('invalid user', 422);
        }
        $data = Sbp::whereNull('sbps.deleted_at')
            ->leftJoin('users as u', 'u.id', 'sbps.user_id')
            ->join('divisions as d', 'd.id', 'sbps.division_id')
            ->orderBy('sbps.created_at', 'desc');
        if ($user->division_id) {
            $data->where('sbps.division_id', $user->division_id);
        }
        $q = $this->request->get('q');
        if ($q) {
            $data->where('sbps.input_date', 'like', "%$q%");
        }
        return $data;
    }

    public function headings(): array
    {
        return ['Kanwil', 'Jumlah', 'Tindak Lanjut', 'Tanggal Input', 'User Input'];
    }

    public function read()
    {
    }
}
