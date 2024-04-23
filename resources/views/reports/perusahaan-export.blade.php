<x-layouts.report title="LAPORAN Perusahaan Export">
    <x-slot:header>LAPORAN PERUSAHAAN EXPORT</x-slot:header>

    <table width="100%" class="table">
        <thead>
            <tr>
                <th class="text-center">No</th>
                <th class="text-center">Nama Kantor</th>
                <th class="text-center">Nama Perusahaan</th>
                <th class="text-center">PEB</th>
                <th class="text-center">Bruto</th>
                <th class="text-center">Netto</th>
                <th class="text-center">Devisa</th>
                <th class="text-center">Bea Keluar</th>
                <th class="text-center">Jumlah Liter</th>
                <th class="text-center">Jumlah Cukai</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($perusahaan as $item)
                <tr>
                    <td class="text-left">{{ $loop->iteration }}</td>
                    <td class="text-left">{{ $item->kantor_nama }}</td>
                    <td class="text-left">{{ $item->nama_perusahaan }}</td>
                    <td class="text-right">{{ number_format($item->peb) }}</td>
                    <td class="text-right">{{ number_format($item->bruto, 2) }}</td>
                    <td class="text-right">{{ number_format($item->netto, 2) }}</td>
                    <td class="text-right">{{ number_format($item->devisa, 2) }}</td>
                    <td class="text-right">{{ number_format($item->bea_keluar, 2) }}</td>
                    <td class="text-right">{{ number_format($item->jumlah_liter) }}</td>
                    <td class="text-right">{{ number_format($item->jumlah_cukai, 2) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</x-layouts.report>
