<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\OperatingFirearmController;

use App\Context\HasPaginate;
use App\Context\Reader;
use App\Models\OperatingFirearm;
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
            ->select(['operating_firearms.*', 'u.name as user_name']);
    }

    public function collection()
    {
        return $this->data()
            ->select([
                'operating_firearms.caliber_type',
                'operating_firearms.weapon_number',
                'operating_firearms.pass_book_number',
                'operating_firearms.validity_period',
                'operating_firearms.condition',
                'operating_firearms.weapon_holder_name',
                'operating_firearms.weapon_holder_rank',
                'operating_firearms.weapon_holder_position',
                'operating_firearms.ammo_amount',
                'operating_firearms.notes',
                'operating_firearms.input_date',
                'u.name as user_name'
            ])
            ->get();
    }

    public function headings(): array
    {
        return [
            'Jenis Kaliber', 'Nomor Senjata', 'Nomor Buku Pas', 'Masa Berlaku',
            'Kondisi', 'Nama Pemegang Senjata', 'Jabatan Pemegang Senjata', 'Pangkat Pemegang Senjata',
            'Jumlah Amunisi', 'Keterangan', 'Tanggal Input', 'User Input'
        ];
    }

    private function data()
    {
        $user = auth()->user();
        if (is_null($user)) {
            throw new \Exception('invalid user', 422);
        }
        $data = OperatingFirearm::whereNull('operating_firearms.deleted_at')
            ->leftJoin('users as u', 'u.id', 'operating_firearms.user_id')
            ->orderBy('operating_firearms.created_at', 'desc');
        if ($user->division_id) {
            $data->where('operating_firearms.division_id', $user->division_id);
        }
        $q = $this->request->get('q');
        if ($q) {
            $data->where('operating_firearms.name', 'like', "%$q%");
        }
        return $data;
    }

    public function read()
    {
    }
}
