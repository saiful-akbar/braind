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
                <th>Jenis Kapal</th>
                <th>Merk Tipe Mesin</th>
                <th>Jumlah Mesin</th>
                <th>Tahun Pembuatan</th>
                <th>Tahun Rehab</th>
                <th>Kondisi Badan Kapal</th>
                <th>Kondisi Mesin Kapal</th>
                <th>Status Pengoperasian</th>
                <th>Kondisi Aktif</th>
                <th>Cetak Laporan</th>
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
                    <td>{{ $item->jenis_kapal }}</td>
                    <td>{{ $item->merk_tipe_mesin }}</td>
                    <td>{{ $item->jumlah_mesin }}</td>
                    <td>{{ $item->tahun_pembuatan }}</td>
                    <td>{{ $item->tahun_rehab }}</td>
                    <td>{{ $item->kondisi_badan_kapal }}</td>
                    <td>{{ $item->kondisi_mesin_kapal }}</td>
                    <td>{{ $item->status_pengoperasian }}</td>
                    <td>{{ $item->kondisi_aktif ? 'Ya' : 'Tidak' }}</td>
                    <td>{{ $item->cetak ? 'Ya' : 'Tidak' }}</td>
                    <td>{{ $item->tanggal_input }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
