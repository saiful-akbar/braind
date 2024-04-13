<x-layouts.report title="Report Perusahaan Import">
    <x-slot:header>Perusahaan Import</x-slot:header>

    <table width="100%" class="table">
        <thead>
            <tr>
                <th class="text-left">No</th>
                <th class="text-left">Nama Kantor</th>
                <th class="text-left">Nama Perusahaan</th>
                <th class="text-right">PIB</th>
                <th class="text-right">Pembayaran Bea Masuk</th>
                <th class="text-right">Netto</th>
                <th class="text-right">Bruto</th>
                <th class="text-right">Total Pembayaran</th>
                <th class="text-right">Bea Masuk</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($perusahaan as $item)
                <tr>
                    <td class="text-left">{{ $loop->iteration }}</td>
                    <td class="text-left">{{ $item->kantor_nama }}</td>
                    <td class="text-left">{{ $item->nama_perusahaan }}</td>
                    <td class="text-right">{{ number_format($item->pib) }}</td>
                    <td class="text-right">{{ number_format($item->pembayaran_bea_masuk, 2) }}</td>
                    <td class="text-right">{{ number_format($item->netto, 2) }}</td>
                    <td class="text-right">{{ number_format($item->bruto, 2) }}</td>
                    <td class="text-right">{{ number_format($item->total_pembayaran, 2) }}</td>
                    <td class="text-right">{{ number_format($item->bea_masuk, 2) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</x-layouts.report>
