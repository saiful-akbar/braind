<!DOCTYPE html>
<html lang="id">

<head>
    <title>Perusahaan Cukai HT + HPTL</title>
</head>

<body>
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Kantor</th>
                <th>Nama Perusahaan</th>
                <th>NPPBKC</th>
                <th>Jumlah CK-1</th>
                <th>Jenis BKC</th>
                <th>Jumlah</th>
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
                    <td>{{ $item->jumlah_ck }}</td>
                    <td>{{ $item->jenis_bkc }}</td>
                    <td>{{ $item->jumlah }}</td>
                    <td>{{ $item->jumlah_cukai }}</td>
                    <td>{{ $item->tanggal_input }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
