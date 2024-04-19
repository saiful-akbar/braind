<x-layouts.report title="Report Operasi Alat Telekomunikasi">
    <x-slot:header>Operasi Alat Telekomunikasi</x-slot:header>

    <table width="100%" class="table">
        <thead>
            <tr>
                <th class="text-center">No</th>
                <th class="text-center">Nama Barang</th>
                <th class="text-center">Kode Barang</th>
                <th class="text-center">NUP</th>
                <th class="text-center">Jenis Perangkat</th>
                <th class="text-center">Harga Perolehan</th>
                <th class="text-center">Tahun Perolehan</th>
                <th class="text-center">Merek</th>
                <th class="text-center">Tipe</th>
                <th class="text-center">Rentang Frekuensi</th>
                <th class="text-center">Teknologi Digital</th>
                <th class="text-center">Status</th>
                <th class="text-center">Lokasi Penempatan</th>
                <th class="text-center">Catatan</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                @for ($i = 1; $i <= 14; $i++)
                    <td class="text-center">{{ $i }}</td>
                @endfor
            </tr>

            @foreach ($data as $item)
                <tr>
                    <td class="text-left">{{ $loop->iteration }}.</td>
                    <td class="text-left">{{ $item->nama_barang }}</td>
                    <td class="text-left">{{ $item->kode_barang }}</td>
                    <td class="text-left">{{ $item->nup }}</td>
                    <td class="text-left">{{ $item->jenis_perangkat }}</td>
                    <td class="text-left">{{ number_format($item->harga_perolehan, 2) }}</td>
                    <td class="text-left">{{ number_format($item->tahun_perolehan) }}</td>
                    <td class="text-left">{{ $item->merek }}</td>
                    <td class="text-left">{{ $item->tipe }}</td>
                    <td class="text-left">{{ $item->rentang_frekuensi }}</td>
                    <td class="text-left">{{ $item->teknologi_digital }}</td>
                    <td class="text-left">{{ $item->status }}</td>
                    <td class="text-left">{{ $item->lokasi_penempatan }}</td>
                    <td class="text-left">{{ $item->catatan }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</x-layouts.report>
