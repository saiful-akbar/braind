<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>{{ $title }} - {{ config('app.name') }}</title>

    <style>
        @page {
            margin: 40px;
        }

        .header-title {
            font-size: 20px;
            font-weight: 600;
            text-transform: capitalize;
        }

        .header-logo {
            text-align: right;
            font-size: 20px;
            font-weight: 600;
        }

        .header-divider {
            margin: 10px 0;
            width: 100%;
            border-bottom: 3px solid black
        }

        .border-bottom {
            border-bottom: 1px solid black
        }

        .header .periode tr th,
        .header .periode tr td {
            font-size: 13px;
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
            font-size: 14px;
            font-weight: 700;
        }

        .table tr td {
            font-size: 13px;
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
                    <td class="header-title">{{ $header }}</td>
                    <td class="header-logo">{{ config('app.name') }}</td>
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
