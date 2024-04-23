<x-layouts.report title="Laporan SBP">
    <x-slot:header>LAPORAN SBP</x-slot:header>

    <table width="100%" class="table">
        <thead>
            <tr>
                <th class="text-left">No.</th>
                <th class="text-left">ID Kantor</th>
                <th class="text-left">Nama Kantor</th>
                <th class="text-right">Jumlah</th>
                <th class="text-right">Tindak Lanjut</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($sbp as $item)
                <tr>
                    <td class="text-left">{{ $loop->iteration }}</td>
                    <td class="text-left">{{ $item->kantor_id }}</td>
                    <td class="text-left">{{ $item->kantor_nama }}</td>
                    <td class="text-right">{{ number_format($item->jumlah, 2) }}</td>
                    <td class="text-right">{{ number_format($item->tindak_lanjut, 2) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</x-layouts.report>
