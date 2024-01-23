<!DOCTYPE html>
<html lang="id">

<head>
    <title>Master Kantor</title>
</head>

<body>
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>ID</th>
                <th>Nama Kantor</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($kantor as $item)
                <tr>
                    <td>{{ $loop->iteration }}</td>
                    <td>{{ $item->id }}</td>
                    <td>{{ $item->nama }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
