<x-layouts.report title="Report Penindakan">
    <x-slot:header>Penindakan</x-slot:header>

    <table width="100%" class="table">
        <thead>
            <tr>
                <th class="text-left">No</th>
                <th class="text-left">Nama Kantor</th>
                <th class="text-left">KPPBC</th>
                <th class="text-left">Nomor SBP</th>
                <th class="text-left">Tanggal SBP</th>
                <th class="text-left">Kode Komoditi</th>
                <th class="text-right">Jumlah</th>
                <th class="text-left">Uraian Detail Barang</th>
                <th class="text-right">Perkiraan Nilai Barang</th>
                <th class="text-right">Potensi Kurang Bayar</th>
                <th class="text-right">Tidak Lanjut</th>
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
