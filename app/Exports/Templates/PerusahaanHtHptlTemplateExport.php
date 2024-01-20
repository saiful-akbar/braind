<?php

namespace App\Exports\Templates;

use PhpOffice\PhpSpreadsheet\Style\Fill;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithHeadings;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class PerusahaanHtHptlTemplateExport implements WithStyles, ShouldAutoSize, WithHeadings
{
    /**
     * Style cell
     */
    public function styles(Worksheet $sheet): array
    {
        return [
            1 => [
                'font' => [
                    'bold' => true,
                ],
                'fill' => [
                    'fillType' => Fill::FILL_SOLID,
                    'color' => [
                        'rgb' => 'd6e69b',
                    ]
                ],
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_CENTER
                ]
            ],
        ];
    }

    /**
     * Heading row
     */
    public function headings(): array
    {
        return [
            'ID Kantor',
            'Nama Kantor',
            'Nama Perusahaan',
            'NPPBKC',
            'Jumlah CK',
            'Jenis BKC',
            'Jumlah',
            'Jumlah Cukai',
        ];
    }
}
