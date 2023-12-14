<?php

namespace App\Exports;

use App\Models\Division;
use Maatwebsite\Excel\Concerns\FromCollection;

class DivisionExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Division::all();
    }
}
