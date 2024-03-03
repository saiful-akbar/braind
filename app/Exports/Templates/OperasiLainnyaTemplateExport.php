<?php

namespace App\Exports\Templates;

use PhpOffice\PhpSpreadsheet\Style\Fill;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Style\Border;
use Maatwebsite\Excel\Concerns\WithHeadings;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class OperasiLainnyaTemplateExport implements WithStyles, ShouldAutoSize, WithHeadings
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
                ],
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => Border::BORDER_THIN,
                        'color' => [
                            'rgb' => '000000'
                        ],
                    ],
                ],
            ],
        ];
    }

    /**
     * Heading row
     */
    public function headings(): array
    {
        return [
            'Kantor ID',
            'Nama Kantor',
            'Jenis Operasi',
            'Merek',
            'Tipe',
            'Lokasi Penempatan',
            'Kondisi',
            'Catatan',
            'Tanggal Input',
        ];
    }
}
