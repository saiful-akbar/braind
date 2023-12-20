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
                <th>ID</th>
                <th>Nama Lengkap</th>
                <th>Username</th>
                <th>Jenis Kelamin</th>
                <th>Tanggal Lahir</th>
                <th>Tempat Lahir</th>
                <th>No. Telepon</th>
                <th>Email</th>
                <th>Negara</th>
                <th>Kota</th>
                <th>Kode Pos</th>
                <th>Alamat Lengkap</th>
                <th>ID Kanwil</th>
                <th>Nama Kanwil</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($users as $user)
                <tr>
                    <th>{{ $loop->iteration }}</th>
                    <th>{{ $user->id }}</th>
                    <th>{{ $user->full_name }}</th>
                    <th>{{ $user->username }}</th>
                    <th>{{ $user->gender == 'male' ? 'Laki-Laki' : 'Perempuan' }}</th>
                    <th>{{ $user->date_of_birth }}</th>
                    <th>{{ $user->place_of_birth }}</th>
                    <th>{{ $user->phone }}</th>
                    <th>{{ $user->email }}</th>
                    <th>{{ $user->country }}</th>
                    <th>{{ $user->city }}</th>
                    <th>{{ $user->postal_code }}</th>
                    <th>{{ $user->address }}</th>
                    <th>{{ $user->division_id }}</th>
                    <th>{{ $user->division_name }}</th>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
