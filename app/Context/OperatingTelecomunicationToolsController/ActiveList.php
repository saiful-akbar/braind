<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\OperatingTelecomunicationToolsController;

use App\Context\HasPaginate;
use App\Context\Reader;
use App\Models\OperatingTelecomunicationTools;
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
            ->select(['operating_telecomunication_tools.*', 'u.name as user_name']);
    }

    public function collection()
    {
        return $this->data()
            ->select([
                'operating_telecomunication_tools.code',
                'operating_telecomunication_tools.nup',
                'operating_telecomunication_tools.name',
                'operating_telecomunication_tools.device_type',
                'operating_telecomunication_tools.acquisition_cost',
                'operating_telecomunication_tools.year_of_acquisition',
                'operating_telecomunication_tools.brand',
                'operating_telecomunication_tools.type',
                'operating_telecomunication_tools.frequency_range',
                'operating_telecomunication_tools.digital_technology',
                'operating_telecomunication_tools.condition',
                'operating_telecomunication_tools.status',
                'operating_telecomunication_tools.placement_location',
                'operating_telecomunication_tools.notes',
                'operating_telecomunication_tools.input_date',
                'u.name as user_name'
            ])
            ->get();
    }

    public function headings(): array
    {
        return [
            'Kode Barang', 'NUP', 'Nama Barang Pada Simak BMN',
            'Jenis Perangkat Telekomunikasi', 'Harga Perolehan', 'Tahun Perolehan',
            'Merk', 'Tipe', 'Range Frekuensi', 'Teknologi Digital', 'Kondisi', 'Status',
            'Lokasi Penempatan', 'Keterangan', 'Tanggal Input', 'User Input'
        ];
    }

    private function data()
    {
        $user = auth()->user();
        if (is_null($user)) {
            throw new \Exception('invalid user', 422);
        }
        $data = OperatingTelecomunicationTools::whereNull('operating_telecomunication_tools.deleted_at')
            ->leftJoin('users as u', 'u.id', 'operating_telecomunication_tools.user_id')
            ->orderBy('operating_telecomunication_tools.created_at', 'desc');
        if ($user->division_id) {
            $data->where('operating_telecomunication_tools.division_id', $user->division_id);
        }
        $q = $this->request->get('q');
        if ($q) {
            $data->where('operating_telecomunication_tools.name', 'like', "%$q%");
        }
        return $data;
    }

    public function read()
    {
    }
}
