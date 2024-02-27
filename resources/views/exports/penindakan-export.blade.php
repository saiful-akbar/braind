<!DOCTYPE html>
<html lang="id">

<head>
    <title>Penindakan</title>
</head>

<body>
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Nama Kantor</th>
                <th>KPPBC</th>
                <th>Nomor SBP</th>
                <th>Tanggal SBP</th>
                <th>Kode Komoditi</th>
                <th>Jumlah</th>
                <th>Uraian</th>
                <th>Perkiraan Nilai Barang</th>
                <th>Potensi Kurang Bayar</th>
                <th>Tindak Lanjut</th>
                <th>Tanggal Input</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($data as $item)
                <tr>
                    <td>{{ $loop->iteration }}</td>
                    <td>{{ $item->kantor_nama }}</td>
                    <td>{{ $item->kppbc }}</td>
                    <td>{{ $item->nomor_sbp }}</td>
                    <td>{{ $item->tanggal_sbp }}</td>
                    <td>{{ $item->kode_komoditi }}</td>
                    <td>{{ $item->jumlah }}</td>
                    <td>{{ $item->uraian }}</td>
                    <td>{{ $item->perkiraan_nilai_barang }}</td>
                    <td>{{ $item->potensi_kurang_bayar }}</td>
                    <td>{{ $item->tindak_lannjut }}</td>
                    <td>{{ $item->tanggal_input }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
