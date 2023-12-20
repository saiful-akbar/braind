<!DOCTYPE html>
<html lang="id">

<head>
    <title>Division - {{ config('app.name') }}</title>
</head>

<body>
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>ID</th>
                <th>Nama Kanwil</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($divisions as $division)
                <tr>
                    <td>{{ $loop->iteration }}</td>
                    <td>{{ $division->id }}</td>
                    <td>{{ $division->name }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
