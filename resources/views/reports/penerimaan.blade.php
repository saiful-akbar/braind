<x-layouts.report title="Report Penerimaan">
    <x-slot:header>Penerimaan</x-slot:header>

    <table width="100%" class="table">
        <thead>
            <tr>
                <th class="text-left">No</th>
                <th class="text-left">Nama Kantor</th>
                <th class="text-right">Target Bea Masuk</th>
                <th class="text-right">Realisasi Bea Masuk</th>
                <th class="text-right">Target Bea Keluar</th>
                <th class="text-right">Realisasi Bea Keluar</th>
                <th class="text-right">Target Cukai</th>
                <th class="text-right">Realisasi Cukai</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($data as $item)
                <tr>
                    <td class="text-left">{{ $loop->iteration }}</td>
                    <td class="text-left">{{ $item->kantor_nama }}</td>
                    <td class="text-right">{{ number_format($item->target_bea_masuk, 2) }}</td>
                    <td class="text-right">{{ number_format($item->realisasi_bea_masuk, 2) }}</td>
                    <td class="text-right">{{ number_format($item->target_bea_keluar, 2) }}</td>
                    <td class="text-right">{{ number_format($item->realisasi_bea_keluar, 2) }}</td>
                    <td class="text-right">{{ number_format($item->target_cukai, 2) }}</td>
                    <td class="text-right">{{ number_format($item->realisasi_cukai, 2) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</x-layouts.report>
