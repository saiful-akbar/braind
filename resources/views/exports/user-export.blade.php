<!DOCTYPE html>
<html lang="id">

<head>
    <title>User - {{ config('app.name') }}</title>
</head>

<body>
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>ID Kantor</th>
                <th>Nama Kantor</th>
                <th>User ID</th>
                <th>Username</th>
                <th>Admin</th>
                <th>Nama Lengkap</th>
                <th>Jenis Kelamin</th>
                <th>Tanggal Lahir</th>
                <th>Tempat Lahir</th>
                <th>Telepon</th>
                <th>Email</th>
                <th>Negara</th>
                <th>Kota</th>
                <th>Kode Pos</th>
                <th>Alamat</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($users as $user)
                <tr>
                    <th>{{ $loop->iteration }}</th>
                    <th>{{ $user->kantor_id }}</th>
                    <th>{{ $user->kantor_nama }}</th>
                    <th>{{ $user->id }}</th>
                    <th>{{ $user->username }}</th>
                    <th>{{ $user->admin ? 'Ya' : 'Tidak' }}</th>
                    <th>{{ $user->nama_lengkap }}</th>
                    <th>{{ $user->jenis_kelamin == 'l' ? 'Laki-Laki' : 'Perempuan' }}</th>
                    <th>{{ $user->tanggal_lahir }}</th>
                    <th>{{ $user->tempat_lahir }}</th>
                    <th>{{ $user->negara }}</th>
                    <th>{{ $user->kota }}</th>
                    <th>{{ $user->kode_pos }}</th>
                    <th>{{ $user->alamat }}</th>
                    <th>{{ $user->telepon }}</th>
                    <th>{{ $user->email }}</th>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
