<x-layouts.report title="Report Operasi Alat Telekomunikasi">
    <x-slot:header>Operasi Alat Telekomunikasi</x-slot:header>

    <table width="100%" class="table">
        <thead>
            <tr>
                <th class="text-left">No</th>
                <th class="text-left">Nama Kantor</th>
                <th class="text-left">Nama Barang</th>
                <th class="text-left">Kode Barang</th>
                <th class="text-left">NUP</th>
                <th class="text-left">Jenis Perangkat</th>
                <th class="text-left">Harga Perolehan</th>
                <th class="text-left">Tahun Perolehan</th>
                <th class="text-left">Merek</th>
                <th class="text-left">Tipe</th>
                <th class="text-left">Rentang Frekuensi</th>
                <th class="text-left">Teknologi Digital</th>
                <th class="text-left">Status</th>
                <th class="text-left">Lokasi Penempatan</th>
                <th class="text-left">Catatan</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($data as $item)
                <tr>
                    <td class="text-left">{{ $loop->iteration }}</td>
                    <td class="text-left">{{ $item->kantor_nama }}</td>
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
