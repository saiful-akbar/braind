<!DOCTYPE html>
<html lang="en">

<head>
    <title>Commodity - {{ config('app.name') }}</title>
</head>

<body>
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>ID</th>
                <th>Name</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($commodities as $commodity)
                <tr>
                    <td>{{ $loop->iteration }}</td>
                    <td>{{ $commodity->id }}</td>
                    <td>{{ $commodity->name }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
