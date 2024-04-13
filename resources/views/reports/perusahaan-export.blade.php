<x-layouts.report title="Report Perusahaan Export">
    <x-slot:header>Perusahaan Export</x-slot:header>

    <table width="100%" class="table">
        <thead>
            <tr>
                <th class="text-left">No</th>
                <th class="text-left">Nama Kantor</th>
                <th class="text-left">Nama Perusahaan</th>
                <th class="text-right">PEB</th>
                <th class="text-right">Bruto</th>
                <th class="text-right">Netto</th>
                <th class="text-right">Devisa</th>
                <th class="text-right">Bea Keluar</th>
                <th class="text-right">Jumlah Liter</th>
                <th class="text-right">Jumlah Cukai</th>
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
