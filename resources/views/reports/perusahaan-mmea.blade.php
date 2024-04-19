<x-layouts.report title="Report Perusahaan Cukai MMEA">
    <x-slot:header>Perusahaan Cukai MMEA</x-slot:header>

    <table width="100%" class="table">
        <thead>
            <tr>
                <th class="text-center">No</th>
                <th class="text-center">Nama Kantor</th>
                <th class="text-center">Nama Perusahaan</th>
                <th class="text-center">NPPBKC</th>
                <th class="text-center">Jumlah Dokumen</th>
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
                    <td class="text-left">{{ $item->nppbkc }}</td>
                    <td class="text-right">{{ number_format($item->jumlah_dokumen) }}</td>
                    <td class="text-right">{{ number_format($item->jumlah_liter) }}</td>
                    <td class="text-right">{{ number_format($item->jumlah_cukai, 2) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</x-layouts.report>
