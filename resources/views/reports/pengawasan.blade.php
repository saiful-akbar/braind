<x-layouts.report title="Laporan Pengawasan">
    <x-slot:header>LAPORAN PENGAWASAN</x-slot:header>

    <table width="100%" class="table">
        <thead>
            <tr>
                <th class="text-center">No</th>
                <th class="text-center">Nama Kantor</th>
                <th class="text-center">Tipe Pengawasan</th>
                <th class="text-center">SBP</th>
                <th class="text-center">Kantor</th>
                <th class="text-center">Nilai Barang</th>
                <th class="text-center">Total Kerugian</th>
                <th class="text-center">Potensi Kerugian</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($data as $item)
                <tr>
                    <td class="text-left">{{ $loop->iteration }}</td>
                    <td class="text-left">{{ $item->kantor_nama }}</td>
                    <td class="text-left">{{ $item->tipe }}</td>
                    <td class="text-left">{{ $item->sbp }}</td>
                    <td class="text-left">{{ $item->kantor }}</td>
                    <td class="text-right">{{ number_format($item->nilai_barang, 2) }}</td>
                    <td class="text-right">{{ number_format($item->total_kerugian, 2) }}</td>
                    <td class="text-right">{{ number_format($item->potensi_kerugian, 2) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</x-layouts.report>
