<!DOCTYPE html>
<html lang="id">

<head>
    <title>Operasi Kapal Patroli</title>
</head>

<body>
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Nama Kantor</th>
                <th>Nomor Lambung</th>
                <th>Kondisi</th>
                <th>Nomor SPB</th>
                <th>Tanggal SPB</th>
                <th>Penerbit SPB</th>
                <th>Jumlah Hari</th>
                <th>Catatan</th>
                <th>Tanggal Input</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($data as $item)
                <tr>
                    <td>{{ $loop->iteration }}</td>
                    <td>{{ $item->kantor_nama }}</td>
                    <td>{{ $item->nomor_lambung }}</td>
                    <td>{{ $item->kondisi }}</td>
                    <td>{{ $item->nomor_spb }}</td>
                    <td>{{ $item->tanggal_spb }}</td>
                    <td>{{ $item->penerbit_spb }}</td>
                    <td>{{ $item->jumlah_hari }}</td>
                    <td>{{ $item->catatan }}</td>
                    <td>{{ $item->tanggal_input }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
