<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\OperatingPatrolBoatController;

use App\Context\HasPaginate;
use App\Context\Reader;
use App\Models\OperationPatrolBoat;
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
            ->select(['operating_patrol_boats.*', 'u.name as user_name']);
    }

    public function collection()
    {
        return $this->data()
            ->select([
                'operating_patrol_boats.hull_number',
                'operating_patrol_boats.condition',
                'operating_patrol_boats.spb_number',
                'operating_patrol_boats.spb_date',
                'operating_patrol_boats.spb_publisher',
                'operating_patrol_boats.day_amount',
                'operating_patrol_boats.notes',
                'operating_patrol_boats.input_date', 'u.name as user_name'
            ])
            ->get();
    }

    public function headings(): array
    {
        return ['No Lambung', 'Kondisi', 'Nomor SPB', 'Tanggal SPB', 'Penerbit SPB', 'Jumlah Hari', 'Ket', 'Tanggal Input', 'User Input'];
    }

    private function data()
    {
        $user = auth()->user();
        if (is_null($user)) {
            throw new \Exception('invalid user', 422);
        }
        $data = OperationPatrolBoat::whereNull('operating_patrol_boats.deleted_at')
            ->leftJoin('users as u', 'u.id', 'operating_patrol_boats.user_id')
            ->orderBy('operating_patrol_boats.created_at', 'desc');
        if ($user->division_id) {
            $data->where('operating_patrol_boats.division_id', $user->division_id);
        }
        $q = $this->request->get('q');
        if ($q) {
            $data->where('operating_patrol_boats.name', 'like', "%$q%");
        }
        return $data;
    }

    public function read()
    {
    }
}
