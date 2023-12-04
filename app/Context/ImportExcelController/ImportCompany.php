<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\ImportExcelController;

use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ImportCompany implements ToModel, WithHeadingRow
{
    private $user;
    private $model;
    private $type;

    public function __construct($user, $model, $type = null)
    {
        $this->user = $user;
        $this->model = $model;
        $this->type = $type;
    }

    public function model(array $row)
    {
        if (isset($row['input_date'])) {
            $row['input_date'] = Carbon::parse($row['input_date']);
        } else {
            $row['input_date'] = Carbon::now(env('APP_TIMEZONE'));
        }
        if ($this->user) {
            $division = $this->user->division;
            $row['user_id'] = $this->user->id;
            $row['division_id'] = $division->id;
        }
        if ($this->type) {
            $row['type'] = $this->type;
            if (isset($row['total_kerugian'])) {
                $row['total'] = $row['total_kerugian'];
            } else {
                $row['total'] = 0;
            }
            if (isset($row['loss_potential'])) {
                $row['loss_value'] = $row['loss_potential'];
                unset($row['loss_potential']);
            }
        }
        if (isset($row['spb_date'])) {
            $row['spb_date'] = Carbon::parse($row['spb_date']);
        } else {
            $row['spb_date'] = Carbon::now();
        }
        if (isset($row['sbp_date'])) {
            $row['sbp_date'] = Carbon::parse($row['sbp_date']);
        } else {
            $row['sbp_date'] = Carbon::now();
        }
        $model = clone $this->model;
        return $model->fill($row);
    }

    public function headingRow(): int
    {
        return 1;
    }
}
