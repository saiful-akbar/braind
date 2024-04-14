<x-layouts.report title="Report Pengawasan">
    <x-slot:header>Pengawasan</x-slot:header>

    <table width="100%" class="table">
        <thead>
            <tr>
                <th class="text-left">No</th>
                <th class="text-left">Nama Kantor</th>
                <th class="text-left">Tipe Pengawasan</th>
                <th class="text-left">SBP</th>
                <th class="text-left">Kantor</th>
                <th class="text-right">Nilai Barang</th>
                <th class="text-right">Total Kerugian</th>
                <th class="text-right">Potensi Kerugian</th>
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
