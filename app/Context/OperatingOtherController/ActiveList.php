<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\OperatingOtherController;

use App\Context\HasPaginate;
use App\Context\Reader;
use App\Models\OperatingOther;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ActiveList implements Reader, FromCollection, WithHeadings
{
    use HasPaginate;

    public function __construct(Request $request)
    {
        $user = auth()->user();
        if (is_null($user)) {
            throw new \Exception('invalid user', 422);
        }
        $this->request = $request;
        $this->data = $this->data()
            ->select(['operating_others.*', 'u.name as user_name']);
        if ($user->division_id) {
            $this->data->where('operating_others.division_id', $user->division_id);
        }
    }

    public function collection()
    {
        return $this->data()
            ->select([
                'operating_others.type_of_operation',
                'operating_others.type',
                'operating_others.placement_location',
                'operating_others.condition',
                'operating_others.notes',
                'operating_others.input_date',
                'u.name as user_name'
            ])
            ->get();
    }

    public function headings(): array
    {
        return [
            'Jenis Operasi', 'Tipe Merek', 'Lokasi Penempatan', 'Kondisi', 'Ket',
            'Tanggal Input', 'User Input'
        ];
    }

    private function data()
    {
        $user = auth()->user();
        if (is_null($user)) {
            throw new \Exception('invalid user', 422);
        }
        $data = OperatingOther::whereNull('operating_others.deleted_at')
            ->leftJoin('users as u', 'u.id', 'operating_others.user_id')
            ->orderBy('operating_others.created_at', 'desc');
        if ($user->division_id) {
            $data->where('operating_others.division_id', $user->division_id);
        }
        $q = $this->request->get('q');
        if ($q) {
            $data->where('operating_others.name', 'like', "%$q%");
        }
        return $data;
    }

    public function read()
    {
    }
}
