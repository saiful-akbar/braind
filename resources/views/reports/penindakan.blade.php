<x-layouts.report title="Laporan Penindakan">
    <x-slot:header>LAPORAN PENINDAKAN</x-slot:header>

    <table width="100%" class="table">
        <thead>
            <tr>
                <th class="text-center">No</th>
                <th class="text-center">Nama Kantor</th>
                <th class="text-center">KPPBC</th>
                <th class="text-center">Nomor SBP</th>
                <th class="text-center">Tanggal SBP</th>
                <th class="text-center">Kode Komoditi</th>
                <th class="text-center">Jumlah</th>
                <th class="text-center">Uraian Detail Barang</th>
                <th class="text-center">Perkiraan Nilai Barang</th>
                <th class="text-center">Potensi Kurang Bayar</th>
                <th class="text-center">Tidak Lanjut</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($data as $item)
                <tr>
                    <td class="text-left">{{ $loop->iteration }}</td>
                    <td class="text-left">{{ $item->kantor_nama }}</td>
                    <td class="text-left">{{ $item->kppbc }}</td>
                    <td class="text-left">{{ $item->nomor_sbp }}</td>
                    <td class="text-left">{{ $item->tanggal_sbp }}</td>
                    <td class="text-left">{{ $item->kode_komoditi }}</td>
                    <td class="text-right">{{ number_format($item->jumlah, 2) }}</td>
                    <td class="text-left">{{ $item->uraian }}</td>
                    <td class="text-right">{{ number_format($item->perkiraan_nilai_barang, 2) }}</td>
                    <td class="text-right">{{ number_format($item->potensi_kurang_bayar, 2) }}</td>
                    <td class="text-left">{{ $item->tindak_lanjut }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</x-layouts.report>
