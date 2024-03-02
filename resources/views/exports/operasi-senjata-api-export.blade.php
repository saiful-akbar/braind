<!DOCTYPE html>
<html lang="id">

<head>
    <title>Operasi Senjata Api</title>
</head>

<body>
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Nama Kantor</th>
                <th>Jenis Kaliber</th>
                <th>Nomor Senjata</th>
                <th>Nama Pemegang Senjata</th>
                <th>Pangkat Pemegang Senjata</th>
                <th>Jabatan Pemegang Senjata</th>
                <th>Nomor Buku PAS</th>
                <th>Masa Berlaku</th>
                <th>Kondisi</th>
                <th>Jumlah Amunisi</th>
                <th>Catatan</th>
                <th>Tanggal Input</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($data as $item)
                <tr>
                    <td>{{ $loop->iteration }}</td>
                    <td>{{ $item->kantor_nama }}</td>
                    <td>{{ $item->jenis_kaliber }}</td>
                    <td>{{ $item->nomor_senjata }}</td>
                    <td>{{ $item->nama_pemegang_senjata }}</td>
                    <td>{{ $item->pangkat_pemegang_senjata }}</td>
                    <td>{{ $item->jabatan_pemegang_senjata }}</td>
                    <td>{{ $item->nomor_buku_pas }}</td>
                    <td>{{ $item->masa_berlaku }}</td>
                    <td>{{ $item->kondisi }}</td>
                    <td>{{ $item->jumlah_amunisi }}</td>
                    <td>{{ $item->catatan }}</td>
                    <td>{{ $item->tanggal_input }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
