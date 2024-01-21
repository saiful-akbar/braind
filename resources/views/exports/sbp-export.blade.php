@php
    use PhpOffice\PhpSpreadsheet\Shared\Date;
@endphp

<!DOCTYPE html>
<html lang="en">

<head>
    <title>SBP - {{ config('app.name') }}</title>
</head>

<body>
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>ID Kantor</th>
                <th>Nama Kantor</th>
                <th>ID SBP</th>
                <th>Jumlah</th>
                <th>Tidak Lanjut</th>
                <th>Tanggal Input</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($sbp as $item)
                <tr>
                    <td>{{ $loop->iteration }}</td>
                    <td>{{ $item->kantor_id }}</td>
                    <td>{{ $item->kantor_nama }}</td>
                    <td>{{ $item->id }}</td>
                    <td>{{ number_format($item->jumlah) }}</td>
                    <td>{{ number_format($item->tindak_lanjut) }}</td>
                    <td>{{ $item->tanggal_input }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
