<!DOCTYPE html>
<html lang="id">

<head>
    <title>Pengawasan</title>
</head>

<body>
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Nama Kantor</th>
                <th>Tipe</th>
                <th>SBP</th>
                <th>Kantor</th>
                <th>Nilai Barang</th>
                <th>Total Kerugian</th>
                <th>Potensi Kerugian</th>
                <th>Tidak Lanjut</th>
                <th>Tanggal Input</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($data as $item)
                <tr>
                    <td>{{ $loop->iteration }}</td>
                    <td>{{ $item->kantor_nama }}</td>
                    <td>{{ $item->tipe }}</td>
                    <td>{{ $item->sbp }}</td>
                    <td>{{ $item->kantor }}</td>
                    <td>{{ $item->nilai_barang }}</td>
                    <td>{{ $item->total_kerugian }}</td>
                    <td>{{ $item->potensi_kerugian }}</td>
                    <td>{{ $item->tindak_lanjut }}</td>
                    <td>{{ $item->tanggal_input }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
