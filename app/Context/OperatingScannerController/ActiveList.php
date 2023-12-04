<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\OperatingScannerController;

use App\Context\HasPaginate;
use App\Context\Reader;
use App\Models\OperatingScanner;
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
            ->select(['operating_scanners.*', 'u.name as user_name']);
    }

    public function collection()
    {
        return $this->data()
            ->select([
                'operating_scanners.scanner',
                'operating_scanners.name',
                'operating_scanners.tool_size',
                'operating_scanners.brand',
                'operating_scanners.type',
                'operating_scanners.serial_number',
                'operating_scanners.singgle_dual_view',
                'operating_scanners.year_of_acquisition',
                'operating_scanners.condition',
                'operating_scanners.placement_location',
                'operating_scanners.operating_hours',
                'operating_scanners.scan_hours',
                'operating_scanners.number_of_scans',
                'operating_scanners.output',
                'operating_scanners.notes',
                'operating_scanners.input_date',
                'u.name as user_name'
            ])
            ->get();
    }

    public function headings(): array
    {
        return [
            'Pemindai/Pendeteksi', 'Nama Alat', 'Ukuran Alat', 'Merek', 'Tipe',
            'Nomor Seri Mesin', 'Singgle Dual view', 'Tahun Perolehan', 'Kondisi',
            'Lokasi Penempatan', 'Jam Operasi', 'Jam Scan', 'Jumlah Scan', 'Output',
            'Keterangan', 'Tanggal Input', 'User Input'
        ];
    }

    private function data()
    {
        $user = auth()->user();
        if (is_null($user)) {
            throw new \Exception('invalid user', 422);
        }
        $data = OperatingScanner::whereNull('operating_scanners.deleted_at')
            ->leftJoin('users as u', 'u.id', 'operating_scanners.user_id')
            ->orderBy('operating_scanners.created_at', 'desc');
        if ($user->division_id) {
            $data->where('operating_scanners.division_id', $user->division_id);
        }
        $q = $this->request->get('q');
        if ($q) {
            $data->where('operating_scanners.name', 'like', "%$q%");
        }
        return $data;
    }

    public function read()
    {
    }
}
