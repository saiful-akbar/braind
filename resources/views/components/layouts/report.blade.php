<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>{{ $title }} - {{ config('app.name') }}</title>

    <style>
        @page {
            margin: 40px;
        }

        * {
            font-size: 13px;
        }

        .header-title {
            font-weight: 500;
            text-transform: capitalize;
        }

        .header-logo {
            text-align: right;
            font-weight: 500;
        }

        .header-divider {
            margin: 10px 0;
            width: 100%;
            border-bottom: 3px solid black
        }

        .border-bottom {
            border-bottom: 1px solid black
        }

        .main-content {
            margin-top: 20px;
        }

        .text-left {
            text-align: left !important;
        }

        .text-right {
            text-align: right;
        }

        .text-center {
            text-align: center;
        }

        .table {
            border-spacing: 0;
        }

        .table tr th,
        .table tr td {
            padding: 5px;
            border: 0.3px solid black;
        }

        .table tr th {
            font-weight: 700;
        }

        .page-break {
            page-break-after: always;
        }
    </style>

    @isset($style)
        {{ $style }}
    @endisset
</head>

<body>
    <header class="header">
        <table border="0" cellspacing="0" cellpadding="0" width="100%">
            <thead>
                <tr>
                    <td class="header-logo text-left">
                        KEMENTRIAN KEUANGAN REPUBLIK INDONESIA <br> DIREKTORAT JENDERAL BEA DAN CUKAI
                    </td>

                    <td class="header-title text-right">{{ $header }}</td>
                </tr>
            </thead>
        </table>

        <div class="header-divider"></div>

        <table class="periode" border="0" cellspacing="5" cellpadding="0">
            <tr>
                <th class="text-left">Periode</th>
                <td>:</td>
                <td>{{ request('start_period') }} ~ {{ request('end_period') }}</td>
            </tr>
            <tr>
                <th class="text-left">Status</th>
                <td>:</td>
                <td>{{ ucfirst(request('status', 'aktif')) }}</td>
            </tr>
            <tr>
                <th class="text-left">Tanggal</th>
                <td>:</td>
                <td>{{ date('d M Y') }}</td>
            </tr>
        </table>
    </header>

    <main class="main-content">
        {{ $slot }}
    </main>
</body>

</html>
