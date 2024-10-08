<x-layouts.report title="Laporan Operasi Senjata Api">
    <x-slot:header>LAPORAN OPERASI SENJATA API</x-slot:header>

    <table width="100%" class="table">
        <thead>
            <tr>
                <th class="text-center">No</th>
                <th class="text-center">Nama Kantor</th>
                <th class="text-center">Jenis Kaliber</th>
                <th class="text-center">No. Senjata</th>
                <th class="text-center">Nama Pemegang</th>
                <th class="text-center">Pangkat Pemegang</th>
                <th class="text-center">Jabatan Pemegang</th>
                <th class="text-center">No. Buku PAS</th>
                <th class="text-center">Masa Berlaku</th>
                <th class="text-center">Kondisi</th>
                <th class="text-center">Jumlah Amunisi</th>
                <th class="text-center">Catatan</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($data as $item)
                <tr>
                    <td class="text-left">{{ $loop->iteration }}</td>
                    <td class="text-left">{{ $item->kantor_nama }}</td>
                    <td class="text-left">{{ $item->jenis_kaliber }}</td>
                    <td class="text-left">{{ $item->nomor_senjata }}</td>
                    <td class="text-left">{{ $item->nama_pemegang_senjata }}</td>
                    <td class="text-left">{{ $item->pangkat_pemegang_senjata }}</td>
                    <td class="text-left">{{ $item->jabatan_pemegang_senjata }}</td>
                    <td class="text-left">{{ $item->nomor_buku_pas }}</td>
                    <td class="text-left">{{ $item->masa_berlaku }}</td>
                    <td class="text-left">{{ $item->kondisi }}</td>
                    <td class="text-right">{{ number_format($item->jumlah_amunisi) }}</td>
                    <td class="text-left">{{ $item->catatan }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</x-layouts.report>
