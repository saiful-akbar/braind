<x-layouts.report title="Report Perusahaan HT + HPTL">
    <x-slot:header>Perusahaan HT + HPTL</x-slot:header>

    <table width="100%" class="table">
        <thead>
            <tr>
                <th class="text-left">No.</th>
                <th class="text-left">Nama Kantor</th>
                <th class="text-left">Nama Perusahaan</th>
                <th class="text-left">NPPBKC</th>
                <th class="text-right">CK-1</th>
                <th class="text-left">Jenis BKC</th>
                <th class="text-right">Jumlah</th>
                <th class="text-right">Jumlah Cukai</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($perusahaan as $item)
                <tr>
                    <td class="text-left">{{ $loop->iteration }}</td>
                    <td class="text-left">{{ $item->kantor_nama }}</td>
                    <td class="text-left">{{ $item->nama_perusahaan }}</td>
                    <td class="text-left">{{ $item->nppbkc }}</td>
                    <td class="text-right">{{ number_format($item->jumlah_ck) }}</td>
                    <td class="text-left">{{ $item->jenis_bkc }}</td>
                    <td class="text-right">{{ number_format($item->jumlah, 2) }}</td>
                    <td class="text-right">{{ number_format($item->jumlah_cukai, 2) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</x-layouts.report>
