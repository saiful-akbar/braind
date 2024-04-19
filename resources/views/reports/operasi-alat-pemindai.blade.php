<x-layouts.report title="Report Oprasi Alat Pemindai">
    <x-slot:header>Operasi Alat Pemindai</x-slot:header>

    <table width="100%" class="table">
        <thead>
            <tr>
                <th class="text-center">No</th>
                <th class="text-center">Nama Kantor</th>
                <th class="text-center">Pemindai</th>
                <th class="text-center">Nama Alat</th>
                <th class="text-center">Ukuran</th>
                <th class="text-center">Merek</th>
                <th class="text-center">Tipe</th>
                <th class="text-center">Nomor Seri</th>
                {{-- <th class="text-center">Tampilan</th> --}}
                <th class="text-center">Tahun Peolehan</th>
                <th class="text-center">Kondisi</th>
                <th class="text-center">Lokasi Penempatan</th>
                <th class="text-center">Jam Oprasi</th>
                <th class="text-center">Jam Pemindaian</th>
                <th class="text-center">Jumlah Pemindaian</th>
                {{-- <th class="text-left">Hasil Keluaran</th> --}}
                {{-- <th class="text-left">Catatan</th> --}}
            </tr>
        </thead>

        <tbody>
            @foreach ($data as $item)
                <tr>
                    <td class="text-left">{{ $loop->iteration }}</td>
                    <td class="text-left">{{ $item->kantor_nama }}</td>
                    <td class="text-left">{{ $item->pemindai }}</td>
                    <td class="text-left">{{ $item->nama_alat }}</td>
                    <td class="text-left">{{ $item->ukuran }}</td>
                    <td class="text-left">{{ $item->merek }}</td>
                    <td class="text-left">{{ $item->tipe }}</td>
                    <td class="text-left">{{ $item->nomor_seri }}</td>
                    {{-- <td class="text-left">{{ $item->tampilan }}</td> --}}
                    <td class="text-right">{{ $item->tahun_perolehan }}</td>
                    <td class="text-left">{{ $item->kondisi }}</td>
                    <td class="text-left">{{ $item->lokasi_penempatan }}</td>
                    <td class="text-right">{{ number_format($item->jam_operasi, 2) }}</td>
                    <td class="text-right">{{ number_format($item->jam_penindakan, 2) }}</td>
                    <td class="text-right">{{ number_format($item->jumlah_pemindaian, 2) }}</td>
                    {{-- <td class="text-left">{{ $item->hasil_keluaran }}</td> --}}
                    {{-- <td class="text-left">{{ $item->catatan }}</td> --}}
                </tr>
            @endforeach
        </tbody>
    </table>
</x-layouts.report>
