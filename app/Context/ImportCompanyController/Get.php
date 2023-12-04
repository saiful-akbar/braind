<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\ImportCompanyController;

use App\Context\Reader;
use App\Models\ImportCompany;

class Get implements Reader
{
    private $id;

    public function __construct($id)
    {
        $this->id = $id;
    }

    public function read()
    {
        $ic = ImportCompany::find($this->id);
        if (is_null($ic)) {
            throw new \Exception("Data not found", 422);
        }
        return $ic;
    }
}
