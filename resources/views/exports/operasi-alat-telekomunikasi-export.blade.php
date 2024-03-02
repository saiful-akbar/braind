<!DOCTYPE html>
<html lang="id">

<head>
    <title>Operasi Alat Pemindai</title>
</head>

<body>
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Nama Kantor</th>
                <th>Nama Barang</th>
                <th>Kode Barang</th>
                <th>NUP</th>
                <th>Jenis Perangkat</th>
                <th>Harga Perolehan</th>
                <th>Tahun Perolehan</th>
                <th>Merek</th>
                <th>Tipe</th>
                <th>Rentang Frekuensi</th>
                <th>Teknologi Digital</th>
                <th>Kondisi</th>
                <th>Status</th>
                <th>Lokasi Penempatan</th>
                <th>Catatan</th>
                <th>Tanggal Input</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($data as $item)
                <tr>
                    <td>{{ $loop->iteration }}</td>
                    <td>{{ $item->kantor_nama }}</td>
                    <td>{{ $item->nama_barang }}</td>
                    <td>{{ $item->kode_barang }}</td>
                    <td>{{ $item->nup }}</td>
                    <td>{{ $item->jenis_perangkat }}</td>
                    <td>{{ $item->harga_perolehan }}</td>
                    <td>{{ $item->tahun_perolehan }}</td>
                    <td>{{ $item->merek }}</td>
                    <td>{{ $item->tipe }}</td>
                    <td>{{ $item->rentang_frekuensi }}</td>
                    <td>{{ $item->teknologi_digital }}</td>
                    <td>{{ $item->kondisi }}</td>
                    <td>{{ $item->status }}</td>
                    <td>{{ $item->lokasi_penempatan }}</td>
                    <td>{{ $item->catatan }}</td>
                    <td>{{ $item->tanggal_input }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
