<x-layouts.report title="Report Operasi Lainnya">
    <x-slot:header>Operasi Lainnya</x-slot:header>

    <table width="100%" class="table">
        <thead>
            <tr>
                <th class="text-left">No</th>
                <th class="text-left">Nama Kantor</th>
                <th class="text-left">Jenis Operasi</th>
                <th class="text-left">Merek</th>
                <th class="text-left">Tipe</th>
                <th class="text-left">Lokasi Penempatan</th>
                <th class="text-left">Kondisi</th>
                <th class="text-left">Catatan</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($data as $item)
                <tr>
                    <td class="text-left">{{ $loop->iteration }}</td>
                    <td class="text-left">{{ $item->kantor_nama }}</td>
                    <td class="text-left">{{ $item->jenis_operasi }}</td>
                    <td class="text-left">{{ $item->merek }}</td>
                    <td class="text-left">{{ $item->tipe }}</td>
                    <td class="text-left">{{ $item->lokasi_penempatan }}</td>
                    <td class="text-left">{{ $item->kondisi }}</td>
                    <td class="text-left">{{ $item->catatan }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</x-layouts.report>
