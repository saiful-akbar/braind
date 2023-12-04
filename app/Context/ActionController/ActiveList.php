<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\ActionController;

use App\Context\HasPaginate;
use App\Context\Reader;
use App\Models\Action;
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
            ->select(['actions.*', 'u.name as user_name']);
    }

    public function collection()
    {
        return $this->data()
            ->select([
                'actions.kppbc',
                'actions.division_id',
                'actions.user_id',
                'actions.sbp_number',
                'actions.sbp_date',
                'actions.comodity_code',
                'actions.amount',
                'actions.description',
                'actions.underpayment_potential',
                'actions.follow_up',
            ])
            ->get();
    }

    public function headings(): array
    {
        return [
            'KANWIL / KPPBC',
            'SBP NOMOR',
            'SBP TANGGAL',
            'KODE KOMODITI',
            'KODE KOMODITI',
            'URAIAN DETIL BARANG',
            'PERKIRAAN NILAI BARANG',
            'POTENSI KURANG BAYAR',
            'TINDAK LANJUT',
        ];
    }

    private function data()
    {
        $user = auth()->user();
        if (is_null($user)) {
            throw new \Exception('invalid user', 422);
        }
        $data = Action::whereNull('actions.deleted_at')
            ->leftJoin('users as u', 'u.id', 'actions.user_id')
            ->select(['actions.*', 'u.name as user_name'])
            ->orderBy('actions.created_at', 'desc');
        if ($user->division_id) {
            $data->where('actions.division_id', $user->division_id);
        }
        $q = $this->request->get('q');
        if ($q) {
            $data->where('actions.kppbc', 'like', "%$q%");
        }
        return $data;
    }

    public function read()
    {
    }
}
