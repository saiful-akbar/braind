<!DOCTYPE html>
<html lang="id">

<head>
    <title>Komoditi - {{ config('app.name') }}</title>
</head>

<body>
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>ID</th>
                <th>Kode Komoditi</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($komoditi as $item)
                <tr>
                    <td>{{ $loop->iteration }}</td>
                    <td>{{ $item->id }}</td>
                    <td>{{ $item->kode }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
