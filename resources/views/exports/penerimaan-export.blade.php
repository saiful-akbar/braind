<!DOCTYPE html>
<html lang="id">

<head>
    <title>Penerimaan</title>
</head>

<body>
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Nama Kantor</th>
                <th>Target Bea Masuk</th>
                <th>Realisasi Bea Masuk</th>
                <th>Target Bea Keluar</th>
                <th>Realisasi Bea Keluar</th>
                <th>Target Cukai</th>
                <th>Realisasi Cukai</th>
                <th>Tanggal Input</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($data as $item)
                <tr>
                    <td>{{ $loop->iteration }}</td>
                    <td>{{ $item->kantor_nama }}</td>
                    <td>{{ $item->target_bea_masuk }}</td>
                    <td>{{ $item->realisasi_bea_masuk }}</td>
                    <td>{{ $item->target_bea_keluar }}</td>
                    <td>{{ $item->realisasi_bea_keluar }}</td>
                    <td>{{ $item->target_cukai }}</td>
                    <td>{{ $item->realisasi_cukai }}</td>
                    <td>{{ $item->tanggal_input }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
