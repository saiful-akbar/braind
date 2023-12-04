<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\ControlController;

use App\Context\HasPaginate;
use App\Context\Reader;
use App\Models\Control;
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
            ->select(['controls.*', 'u.name as user_name']);
    }

    public function collection()
    {
        $type = $this->request->get('type');
        switch ($type) {
            case Control::$TYPE_IMPORT:
            case Control::$TYPE_EXPORT:
                return $this->data()
                    ->select([
                        'controls.name', 'controls.sbp',
                        'controls.total',
                        'controls.follow_up',
                        'controls.item_value',
                        'controls.input_date', 'u.name as user_name'
                    ])
                    ->get();
            case Control::$TYPE_CUKAI_MMEA:
            case Control::$TYPE_CUKAI_HT:
            case Control::$TYPE_CUKAI_EA:
                return $this->data()
                    ->select([
                        'controls.name', 'controls.sbp',
                        'controls.total',
                        'controls.follow_up',
                        'controls.item_value', 'controls.loss_value',
                        'controls.input_date', 'u.name as user_name'
                    ])
                    ->get();
        }
        return [];
    }

    public function headings(): array
    {
        $type = $this->request->get('type');
        switch ($type) {
            case Control::$TYPE_IMPORT:
            case Control::$TYPE_EXPORT:
                return ['Kantor', 'SBP', 'Total Kerugian', 'Tindak Lanjut', 'Nilai barang', 'Tanggal Input', 'User Input'];
            case Control::$TYPE_CUKAI_MMEA:
            case Control::$TYPE_CUKAI_HT:
            case Control::$TYPE_CUKAI_EA:
                return ['Kantor', 'SBP', 'Total Kerugian', 'Tindak Lanjut', 'Nilai barang', 'Nilai Potensi Kerugian Negara', 'Tanggal Input', 'User Input'];
        }
        return [];
    }

    public function data()
    {
        $type = $this->request->get('type');
        $user = auth()->user();
        if (is_null($user)) {
            throw new \Exception('invalid user', 422);
        }
        $data = Control::whereNull('controls.deleted_at')
            ->leftJoin('users as u', 'u.id', 'controls.user_id')
            ->select(['controls.*', 'u.name as user_name'])
            ->orderBy('controls.created_at', 'desc');
        if ($type) {
            $data->where('type', $type);
        }
        if ($user->division_id) {
            $data->where('controls.division_id', $user->division_id);
        }
        $q = $this->request->get('q');
        if ($q) {
            $data->where('controls.name', 'like', "%$q%");
        }
        return $data;
    }

    public function read()
    {
    }
}
