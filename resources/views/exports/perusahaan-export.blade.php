<!DOCTYPE html>
<html lang="id">

<head>
    <title>Perusahaan</title>
</head>

<body>
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>ID</th>
                <th>Nama Perusahaan</th>
                <th>Status</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($data as $item)
                <tr>
                    <td>{{ $loop->iteration }}</td>
                    <td>{{ $item->id }}</td>
                    <td>{{ $item->nama }}</td>
                    <td>{{ is_null($item->deleted_at) ? 'Aktif' : 'Dihapus' }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
