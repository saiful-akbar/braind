<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\FileController;

use App\Context\Handler;
use App\Context\ImportExcelController\ImportCompany;
use App\Models\Action;
use App\Models\Control;
use App\Models\CukaiHtHptlCompany;
use App\Models\CukaiMMEACompany;
use App\Models\ExportCompany;
use App\Models\ImportCompany as ModelsImportCompany;
use App\Models\OperatingFirearm;
use App\Models\OperatingOther;
use App\Models\OperatingScanner;
use App\Models\OperatingTelecomunicationTools;
use App\Models\OperationPatrolBoat;
use App\Models\Receipt;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class ImportHandler implements Handler
{
    private $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function handle()
    {
        $user = auth()->user();
        if (is_null($user)) {
            throw new \Exception('Silahkan login dahulu', 422);
        }
        $file = $this->request->file('file');
        $importData = $this->request->get('import_data');

        switch ($importData) {
            case 'import_companies':
                return Excel::import(new ImportCompany($user, new ModelsImportCompany()), $file);
            case 'export_companies':
                return Excel::import(new ImportCompany($user, new ExportCompany()), $file);
            case 'cukai_mmea_companies':
                return Excel::import(new ImportCompany($user, new CukaiMMEACompany()), $file);
            case 'cukai_ht_hptl_companies':
                return Excel::import(new ImportCompany($user, new CukaiHtHptlCompany()), $file);
            case 'receipts':
                return Excel::import(new ImportCompany($user, new Receipt()), $file);
            case 'controls-import':
                return Excel::import(new ImportCompany($user, new Control(), 'imp'), $file);
            case 'controls-export':
                return Excel::import(new ImportCompany($user, new Control(), 'exp'), $file);
            case 'controls-mmea':
                return Excel::import(new ImportCompany($user, new Control(), 'cmm'), $file);
            case 'controls-ht':
                return Excel::import(new ImportCompany($user, new Control(), 'cht'), $file);
            case 'controls-ea':
                return Excel::import(new ImportCompany($user, new Control(), 'cea'), $file);
            case 'operating_patrol_boats':
                return Excel::import(new ImportCompany($user, new OperationPatrolBoat()), $file);
            case 'operating_firearms':
                return Excel::import(new ImportCompany($user, new OperatingFirearm()), $file);
            case 'operating_others':
                return Excel::import(new ImportCompany($user, new OperatingOther()), $file);
            case 'operating_scanners':
                return Excel::import(new ImportCompany($user, new OperatingScanner()), $file);
            case 'operating_telecomunication_tools':
                return Excel::import(new ImportCompany($user, new OperatingTelecomunicationTools()), $file);
            case 'actions':
                return Excel::import(new ImportCompany($user, new Action()), $file);
        }
        throw new \Exception("Error import data $importData", 422);
    }
}
