<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\FileController;

use App\Context\Reader;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ExcelTemplate implements Reader, WithHeadings
{
    private $importData;

    public function __construct($importData)
    {
        $this->importData = $importData;
    }

    public function headings(): array
    {
        switch ($this->importData) {
            case 'import_companies':
                return [
                    'name', 'tax_number', 'pib', 'bruto', 'netto', 'bm_pay', 'total_pay', 'input_date'
                ];
            case 'export_companies':
                return ['name', 'tax_number', 'peb', 'bruto', 'netto', 'devisa', 'export_duty', 'input_date'];
            case 'cukai_mmea_companies':
                return ['name', 'nppbkc', 'number_of_documents', 'number_of_liters', 'amount_of_excise_duty', 'input_date'];
            case 'cukai_ht_hptl_companies':
                return ['name', 'nppbkc', 'ck_amount', 'bkc_type', 'amount', 'tax_amount', 'input_date'];
            case 'receipts':
                return [
                    'target_import_duty',
                    'target_export_duty',
                    'target_tax',
                    'realization_import_duty',
                    'realization_export_duty',
                    'realization_tax',
                    'input_date',
                ];
            case 'controls-import':
                return ['name', 'sbp', 'total_kerugian', 'follow_up', 'item_value', 'input_date'];
            case 'controls-export':
                return ['name', 'sbp', 'total_kerugian', 'follow_up', 'item_value', 'input_date'];
            case 'controls-mmea':
                return ['name', 'sbp', 'total_kerugian', 'follow_up', 'item_value', 'loss_potential', 'input_date'];
            case 'controls-ht':
                return ['name', 'sbp', 'total_kerugian', 'follow_up', 'item_value', 'loss_potential', 'input_date'];
            case 'controls-ea':
                return ['name', 'sbp', 'total_kerugian', 'follow_up', 'item_value', 'loss_potential', 'input_date'];
            case 'operating_patrol_boats':
                return ['hull_number', 'condition', 'spb_number', 'spb_date', 'spb_publisher', 'day_amount', 'notes', 'input_date'];
            case 'operating_firearms':
                return [
                    'caliber_type', 'weapon_number', 'pass_book_number', 'validity_period', 'condition', 'weapon_holder_name',
                    'weapon_holder_rank', 'weapon_holder_position', 'ammo_amount', 'notes', 'input_date'
                ];
            case 'operating_others':
                return ['type_of_operation', 'type', 'placement_location', 'condition', 'notes', 'input_date'];
            case 'operating_scanners':
                return [
                    'scanner', 'name', 'tool_size', 'brand', 'type', 'serial_number', 'singgle_dual_view',
                    'year_of_acquisition', 'condition', 'placement_location', 'operating_hours', 'scan_hours',
                    'number_of_scan', 'output', 'notes', 'input_date', 'number_of_scans'
                ];
            case 'operating_telecomunication_tools':
                return [
                    'device_type', 'acquisition_cost', 'year_of_acquisition',
                    'brand', 'type', 'frequency_range', 'digital_technology', 'condition',
                    'status', 'placement_location', 'notes', 'code', 'nup', 'name', 'iput_date'
                ];
            case 'actions':
                return [
                    'kppbc', 'sbp_number', 'sbp_date', 'comodity_code', 'amount',
                    'description', 'estimated_item_value', 'underpayment_potential',
                    'follow_up', 'input_date'
                ];
        }
        throw new \Exception("template for $this->importData not found", 422);
    }

    public function read()
    {
    }
}
