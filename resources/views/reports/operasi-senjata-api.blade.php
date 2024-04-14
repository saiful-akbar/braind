<x-layouts.report title="Report Operasi Senjata Api">
    <x-slot:header>Operasi Senjata Api</x-slot:header>

    <table width="100%" class="table">
        <thead>
            <tr>
                <th class="text-left">No</th>
                <th class="text-left">Nama Kantor</th>
                <th class="text-left">Jenis Kaliber</th>
                <th class="text-left">No. Senjata</th>
                <th class="text-left">Nama Pemegang</th>
                <th class="text-left">Pangkat Pemegang</th>
                <th class="text-left">Jabatan Pemegang</th>
                <th class="text-left">No. Buku PAS</th>
                <th class="text-left">Masa Berlaku</th>
                <th class="text-left">Kondisi</th>
                <th class="text-right">Jumlah Amunisi</th>
                <th class="text-left">Catatan</th>
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
