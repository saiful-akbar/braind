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
                <th>PIB</th>
                <th>Pembayaran Bea Masuk</th>
                <th>Netto</th>
                <th>Bruto</th>
                <th>Total Pembayaran</th>
                <th>Bea masuk</th>
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
                    <td>{{ $item->pib }}</td>
                    <td>{{ $item->pembayaran_bea_masuk }}</td>
                    <td>{{ $item->netto }}</td>
                    <td>{{ $item->bruto }}</td>
                    <td>{{ $item->total_pembayaran }}</td>
                    <td>{{ $item->bea_masuk }}</td>
                    <td>{{ $item->tanggal_input }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
