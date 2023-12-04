<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\ReceiptController;

use App\Context\HasPaginate;
use App\Context\Reader;
use App\Models\Receipt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
                'receipts.*', 'u.name as user_name', 'd.name as division_name',
                DB::raw('(receipts.target_import_duty + receipts.target_export_duty + receipts.target_tax) as target_total'),
                DB::raw('(receipts.realization_import_duty + receipts.realization_export_duty + receipts.realization_tax) as realization_total'),
            ]);
    }

    public function collection()
    {
        return $this->data()
            ->select([
                DB::raw('d.name as division_name'),
                'receipts.target_import_duty',
                'receipts.target_export_duty',
                'receipts.target_tax',
                'receipts.realization_import_duty',
                'receipts.realization_export_duty',
                'receipts.realization_tax',
                'receipts.input_date', 'u.name as user_name',
                DB::raw('(receipts.target_import_duty + receipts.target_export_duty + receipts.target_tax) as target_total'),
                DB::raw('(receipts.realization_import_duty + receipts.realization_export_duty + receipts.realization_tax) as realization_total'),
            ])
            ->get();
    }

    public function headings(): array
    {
        return ['Kantor', 'Target Capaian', 'Hasil Capaian', 'Presentase', 'Tanggal Input', 'User Input'];
    }

    private function data()
    {
        $user = auth()->user();
        if (is_null($user)) {
            throw new \Exception('invalid user', 422);
        }
        $data = Receipt::whereNull('receipts.deleted_at')
            ->leftJoin('users as u', 'u.id', 'receipts.user_id')
            ->leftJoin('divisions as d', 'd.id', 'receipts.division_id')
            ->orderBy('receipts.created_at', 'desc');
        if ($user->division_id) {
            $data->where('receipts.division_id', $user->division_id);
        }
        $q = $this->request->get('q');
        if ($q) {
            $data->where('receipts.input_date', 'like', "%$q%");
        }
        return $data;
    }

    public function read()
    {
    }
}
