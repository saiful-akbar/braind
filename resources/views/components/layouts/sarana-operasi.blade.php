<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>{{ $title }} - {{ config('app.name') }}</title>

    <style>
        @page {
            margin: 30px;
        }

        * {
            font-size: 13px
        }

        header {
            font-weight: 400;
        }

        header .logo {
            padding-right: 350px;
            width: 70%;
            font-size: 14px;
        }

        .jenis-laporan {
            margin-top: 40px;
            text-align: center;
            font-size: 14px;
        }

        .table-title {
            font-size: 14px;
            text-transform: capitalize;
            margin-top: 30px;
            margin-bottom: 5px;
            font-weight: 400;
        }

        .table tr th,
        .table tr td {
            border: .5px solid #000;
            font-size: 13px;
        }

        .text-center {
            text-align: center
        }

        .text-right {
            text-align: right
        }

        .text-left {
            text-align: left
        }

        #dpso-alatPemindai table tr th,
        #dpso-alatPemindai table tr td {
            font-size: 11px;
        }
    </style>
</head>

<body>
    <header>
        <table width="100%" border="0" cellspacing="0" cellpadding="1">
            <tr>
                <td rowspan="3" class="logo">{!! strtoupper($logo) !!}</td>
                <td colspan="3">Lampiran Surat Pengantar</td>
            </tr>
            <tr>
                <td>Nomor</td>
                <td style="width: 2%">:</td>
                <td>{{ $nomor }}</td>
            </tr>
            <tr>
                <td>Tanggal</td>
                <td style="width: 2%">:</td>
                <td>{{ date_format(date_create($tanggal), 'd M Y') }}</td>
            </tr>
        </table>
    </header>

    <div class="jenis-laporan">{{ $jenisLaporan }}</div>

    <main>{{ $slot }}</main>
</body>

</html>
