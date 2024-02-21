<!DOCTYPE html>
<html lang="id">

<head>
    <title>Perusahaan Export</title>
</head>

<body>
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Nama Kantor</th>
                <th>Nama Perusahaan</th>
                <th>NPWP</th>
                <th>PEB</th>
                <th>Bruto</th>
                <th>Netto</th>
                <th>Devisa</th>
                <th>Bea Keluar</th>
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
                    <td>{{ $item->npwp }}</td>
                    <td>{{ $item->peb }}</td>
                    <td>{{ $item->bruto }}</td>
                    <td>{{ $item->netto }}</td>
                    <td>{{ $item->devisa }}</td>
                    <td>{{ $item->bea_keluar }}</td>
                    <td>{{ $item->jumlah_liter }}</td>
                    <td>{{ $item->jumlah_cukai }}</td>
                    <td>{{ $item->tanggal_input }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
