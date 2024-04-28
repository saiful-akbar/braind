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
                <th>Pemindai</th>
                <th>Nama Alat</th>
                <th>Ukuran</th>
                <th>Merek</th>
                <th>Tipe</th>
                <th>Nomor Seri</th>
                <th>Tampilan</th>
                <th>Tahun Perolehan</th>
                <th>Kondisi</th>
                <th>Lokasi Penempatan</th>
                <th>Jam Oprasi</th>
                <th>Jam Pemindaian</th>
                <th>Jumlah Pemindaian</th>
                <th>Hasil Keluaran</th>
                <th>Catatan</th>
                <th>Tanggal Input</th>
                <th>Cetak Laporan</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($data as $item)
                <tr>
                    <td>{{ $loop->iteration }}</td>
                    <td>{{ $item->kantor_nama }}</td>
                    <td>{{ $item->pemindai }}</td>
                    <td>{{ $item->nama_alat }}</td>
                    <td>{{ $item->ukuran }}</td>
                    <td>{{ $item->merek }}</td>
                    <td>{{ $item->tipe }}</td>
                    <td>{{ $item->nomor_seri }}</td>
                    <td>{{ $item->tampilan }}</td>
                    <td>{{ $item->tahun_perolehan }}</td>
                    <td>{{ $item->kondisi }}</td>
                    <td>{{ $item->lokasi_penempatan }}</td>
                    <td>{{ $item->jam_operasi }}</td>
                    <td>{{ $item->jam_pemindaian }}</td>
                    <td>{{ $item->jumlah_pemindaian }}</td>
                    <td>{{ $item->hasil_keluaran }}</td>
                    <td>{{ $item->catatan }}</td>
                    <td>{{ $item->tanggal_input }}</td>
                    <td>{{ $item->cetak ? 'Ya' : 'Tidak' }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
