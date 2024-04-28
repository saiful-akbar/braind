<!DOCTYPE html>
<html lang="id">

<head>
    <title>Operasi Lainnya</title>
</head>

<body>
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Nama Kantor</th>
                <th>Jenis Operasi</th>
                <th>Merek</th>
                <th>Tipe</th>
                <th>Lokasi Penempatan</th>
                <th>Kondisi</th>
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
                    <td>{{ $item->jenis_operasi }}</td>
                    <td>{{ $item->merek }}</td>
                    <td>{{ $item->tipe }}</td>
                    <td>{{ $item->lokasi_penempatan }}</td>
                    <td>{{ $item->kondisi }}</td>
                    <td>{{ $item->catatan }}</td>
                    <td>{{ $item->tanggal_input }}</td>
                    <td>{{ $item->cetak ? 'Ya' : 'Tidak' }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
