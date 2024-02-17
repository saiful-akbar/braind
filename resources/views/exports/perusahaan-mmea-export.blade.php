<!DOCTYPE html>
<html lang="id">

<head>
    <title>Perusahaan Cukai MMEA</title>
</head>

<body>
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Nama Kantor</th>
                <th>Nama Perusahaan</th>
                <th>NPPBKC</th>
                <th>Jumlah Dokumen</th>
                <th>Jumlah Liter</th>
                <th>Jumlah Cukai</th>
                <th>Tanggal Input</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($data as $item)
                <tr>
                    <td>{{ $loop->iteration }}</td>
                    <td>{{ $item->kantor_nama }}</td>
                    <td>{{ $item->nama_perusahaan }}</td>
                    <td>{{ $item->nppbkc }}</td>
                    <td>{{ $item->jumlah_dokumen }}</td>
                    <td>{{ $item->jumlah_liter }}</td>
                    <td>{{ $item->jumlah_cukai }}</td>
                    <td>{{ $item->tanggal_input }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
