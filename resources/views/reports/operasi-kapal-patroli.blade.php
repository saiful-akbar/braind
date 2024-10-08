<x-layouts.report title="Laporan Operasi Kapal Patroli">
    <x-slot:header>LAPORAN OPERASI KAPAL PARTOLI</x-slot:header>

    <table width="100%" class="table">
        <thead>
            <tr>
                <th class="text-center">No</th>
                <th class="text-center">Nama Kantor</th>
                <th class="text-center">No. Lambung</th>
                <th class="text-center">Kondisi</th>
                <th class="text-center">No. SPB</th>
                <th class="text-center">Tanggal SPB</th>
                <th class="text-center">Penerbit SPB</th>
                <th class="text-center">Jumlah Hari</th>
                <th class="text-center">Catatan</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($data as $item)
                <tr>
                    <td class="text-left">{{ $loop->iteration }}</td>
                    <td class="text-left">{{ $item->kantor_nama }}</td>
                    <td class="text-left">{{ $item->nomor_lambung }}</td>
                    <td class="text-left">{{ $item->kondisi }}</td>
                    <td class="text-left">{{ $item->nomor_spb }}</td>
                    <td class="text-left">{{ $item->tanggal_spb }}</td>
                    <td class="text-left">{{ $item->penerbit_spb }}</td>
                    <td class="text-right">{{ number_format($item->jumlah_hari) }}</td>
                    <td class="text-left">{{ $item->catatan }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</x-layouts.report>
