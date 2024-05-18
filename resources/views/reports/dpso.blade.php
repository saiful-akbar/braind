<x-layouts.sarana-operasi title="Daftar Pemeliharaan Sarana Operasi (DPSO)">
    <x-slot:logo>
        KEMENTRIAN KEUANGAN REPUBLIK INDONESIA <br> DIREKTORAT JENDERAL BEA DAN CUKAI <br> KANTOR WILAYAH DJBC BALI, NTB
        DAN NTT <br>
        @if (!user()->admin)
            {{ $data->nama }}
        @endif
    </x-slot:logo>

    <x-slot:nomor>{{ $nomor }}</x-slot:nomor>
    <x-slot:tanggal>{{ $tanggal_cetak }}</x-slot:tanggal>

    <x-slot:jenis-laporan>
        DAFTAR PEMELIHARAAN SARANA OPERASI (DPSO) <br /> BULAN {{ strtoupper($bulan_pelaporan) }} TAHUN
        {{ $tahun_pelaporan }}
    </x-slot:jenis-laporan>

    <section class="table-container" id="alatTelekomunikasi">
        <div class="table-title">A. PEMELIHARAAN ALAT TELEKOMUNIKASI</div>

        <table class="table" cellspacing="0" cellpadding="3">
            <thead>
                <tr>
                    <th rowspan="2">No.</th>
                    <th rowspan="2">Kode Barang</th>
                    <th rowspan="2">NUP</th>
                    <th rowspan="2">Nama Barang Pada SIMAK</th>
                    <th rowspan="2">Jenis Perangkat Telekomunikasi</th>
                    <th rowspan="2">Harga Perolehan</th>
                    <th rowspan="2">Tahun Perolehan</th>
                    <th rowspan="2">Merk</th>
                    <th rowspan="2">Tipe</th>
                    <th rowspan="2">Range Frekuensi</th>
                    <th rowspan="2">Teknologi (Analog / Digital)</th>
                    <th rowspan="2">Kondisi (B / RR / RB)</th>
                    <th rowspan="2">Lokasi Penempatan</th>
                    <th colspan="2">Pemeliharan</th>
                    <th rowspan="2">Ket.</th>
                </tr>

                <tr>
                    <th>Tanggal</th>
                    <th>Kegiatan</th>
                </tr>
            </thead>

            @php
                $columns = 16;
            @endphp

            <tbody>
                <tr>
                    @for ($i = 1; $i <= $columns; $i++)
                        <td class="text-center">{{ $i }}</td>
                    @endfor
                </tr>

                @if (count($data->operasiAlatTelekomunikasi) > 0)
                    @foreach ($data->operasiAlatTelekomunikasi as $alatTelekomunikasi)
                        <tr>
                            <td class="text-center">{{ $loop->iteration }}.</td>
                            <td class="text-center">{{ is_empty($alatTelekomunikasi->kode_barang) }}</td>
                            <td class="text-center">{{ is_empty($alatTelekomunikasi->nup) }}</td>
                            <td class="text-center">{{ is_empty($alatTelekomunikasi->nama_barang) }}</td>
                            <td class="text-center">{{ is_empty($alatTelekomunikasi->jenis_perangkat) }}</td>
                            <td class="text-center">
                                {{ is_empty(number_format($alatTelekomunikasi->harga_perolehan, 2)) }}
                            </td>
                            <td class="text-center">{{ is_empty($alatTelekomunikasi->tahun_perolehan) }}</td>
                            <td class="text-center">{{ is_empty($alatTelekomunikasi->merek) }}</td>
                            <td class="text-center">{{ is_empty($alatTelekomunikasi->tipe) }}</td>
                            <td class="text-center">{{ is_empty($alatTelekomunikasi->rentang_frekuensi) }}</td>
                            <td class="text-center">{{ is_empty($alatTelekomunikasi->teknologi_digital) }}</td>
                            <td class="text-center">{{ is_empty($alatTelekomunikasi->kondisi) }}</td>
                            <td class="text-center">{{ is_empty($alatTelekomunikasi->lokasi_penempatan) }}</td>
                            <td class="text-center">-</td>
                            <td class="text-center">-</td>
                            <td class="text-center">{{ is_empty($alatTelekomunikasi->catatan) }}</td>
                        </tr>
                    @endforeach
                @else
                    <tr>
                        <th colspan="{{ $columns }}">- NIHIL -</th>
                    </tr>
                @endif
            </tbody>
        </table>
    </section>

    <section class="table-container" id="senjataApi">
        <div class="table-title">B. PEMELIHARAAN SENJATA API</div>

        <table class="table" cellspacing="0" cellpadding="3">
            <thead>
                <tr>
                    <th rowspan="2">No.</th>
                    <th colspan="3">Senjata Api Dinas</th>
                    <th rowspan="2">Berlaku S/D</th>
                    <th rowspan="2">Kondisi (B / RR / RB)</th>
                    <th colspan="3">Pemegang Senjata</th>
                    <th rowspan="2">Jumlah Amunisi</th>
                    <th colspan="2">Pemeliharaan</th>
                    <th rowspan="2">Ket.</th>
                </tr>

                <tr>
                    <th>Jenis Kaliber</th>
                    <th>Nomor Senjata</th>
                    <th>Nomor Buku Pas</th>
                    <th>Nama</th>
                    <th>Pangkat</th>
                    <th>Jabatan</th>
                    <th>Tanggal</th>
                    <th>Kegiatan</th>
                </tr>
            </thead>

            @php
                $columns = 13;
            @endphp

            <tbody>
                <tr>
                    @for ($i = 1; $i <= $columns; $i++)
                        <td class="text-center">{{ $i }}</td>
                    @endfor
                </tr>

                @if (count($data->operasiSenjataApi) > 0)
                    @foreach ($data->operasiSenjataApi as $senjataApi)
                        <tr>
                            <td class="text-center">{{ $loop->iteration }}.</td>
                            <td class="text-center">{{ is_empty($senjataApi->jenis_kaliber) }}</td>
                            <td class="text-center">{{ is_empty($senjataApi->nomor_senjata) }}</td>
                            <td class="text-center">{{ is_empty($senjataApi->nomor_buku_pas) }}</td>
                            <td class="text-center">{{ is_empty($senjataApi->masa_berlaku) }}</td>
                            <td class="text-center">{{ is_empty($senjataApi->kondisi) }}</td>
                            <td class="text-center">{{ is_empty($senjataApi->nama_pemegang_senjata) }}</td>
                            <td class="text-center">{{ is_empty($senjataApi->pangkat_pemegang_senjata) }}</td>
                            <td class="text-center">{{ is_empty($senjataApi->jabatan_pemegang_senjata) }}</td>
                            <td class="text-center">{{ is_empty(number_format($senjataApi->jumlah_amunisi)) }}</td>
                            <td class="text-center">-</td>
                            <td class="text-center">-</td>
                            <td class="text-center">{{ is_empty($senjataApi->catatan) }}</td>
                        </tr>
                    @endforeach
                @else
                    <tr>
                        <th colspan="{{ $columns }}">- NIHIL -</th>
                    </tr>
                @endif
            </tbody>
        </table>
    </section>

    <section class="table-container" id="dpso-alatPemindai">
        <div class="table-title">C. PEMELIHARAAN ALAT PEMINDAI DAN PENDETEKSI</div>

        <table class="table" cellspacing="0" cellpadding="3">
            <thead>
                <tr>
                    <th rowspan="2">No.</th>
                    <th colspan="10">Jenis Sarana Operasi</th>
                    <th colspan="3">Pengoperasian</th>
                    <th colspan="6">Histori Pemeliharaan</th>
                    <th rowspan="2">Ket.</th>
                </tr>

                <tr>
                    <th>Alat Pemindai / Pendeteksi</th>
                    <th>Nama Alat</th>
                    <th>Merk</th>
                    <th>Tipe</th>
                    <th>Nomor Seri Mesin</th>
                    <th>Ukuran X-Ray</th>
                    <th>Single / Dual View</th>
                    <th>Tahun Perolehan</th>
                    <th>Kondisi (B / RR / RB)</th>
                    <th>Lokasi Penempatan</th>
                    <th>Jam Operasi</th>
                    <th>Jam Scan</th>
                    <th>Jumlah Scan</th>
                    <th>Status Temuan</th>
                    <th>Permintaan Perbaikan Satker - Sarop</th>
                    <th>Permintaan Perbaikan Satker - Sarop Penyedia</th>
                    <th>Status Perbaikan</th>
                    <th>Spare-Part Perbaikan</th>
                    <th>BA - Perbaikan</th>
                </tr>
            </thead>

            @php
                $columns = 21;
            @endphp

            <tbody>
                <tr>
                    @for ($i = 1; $i <= $columns; $i++)
                        <td class="text-center">{{ $i }}</td>
                    @endfor
                </tr>

                @if (count($data->operasiAlatPemindai) > 0)
                    @foreach ($data->operasiAlatPemindai as $alatPemindai)
                        <tr>
                            <td class="text-center">{{ $loop->iteration }}.</td>
                            <td class="text-center">{{ is_empty($alatPemindai->pemindai) }}</td>
                            <td class="text-center">{{ is_empty($alatPemindai->nama_alat) }}</td>
                            <td class="text-center">{{ is_empty($alatPemindai->merek) }}</td>
                            <td class="text-center">{{ is_empty($alatPemindai->tipe) }}</td>
                            <td class="text-center">{{ is_empty($alatPemindai->nomor_seri) }}</td>
                            <td class="text-center">{{ is_empty($alatPemindai->ukuran) }}</td>
                            <td class="text-center">
                                @if ($alatPemindai->tampilan == 'Tunggal')
                                    Single View
                                @else
                                    Dual View
                                @endif
                            </td>
                            <td class="text-center">{{ is_empty($alatPemindai->tahun_perolehan) }}</td>
                            <td class="text-center">{{ is_empty($alatPemindai->kondisi) }}</td>
                            <td class="text-center">{{ is_empty($alatPemindai->lokasi_penempatan) }}</td>
                            <td class="text-center">
                                {{ is_empty(number_format($alatPemindai->jam_operasi)) }}
                            </td>
                            <td class="text-center">
                                {{ is_empty(number_format($alatPemindai->jam_pemindaian)) }}
                            </td>
                            <td class="text-center">
                                {{ is_empty(number_format($alatPemindai->jumlah_pemindaian)) }}
                            </td>
                            <td class="text-center">-</td>
                            <td class="text-center">-</td>
                            <td class="text-center">-</td>
                            <td class="text-center">-</td>
                            <td class="text-center">-</td>
                            <td class="text-center">-</td>
                            <td class="text-center">{{ is_empty($alatPemindai->catatan) }}</td>
                        </tr>
                    @endforeach
                @else
                    <tr>
                        <th colspan="{{ $columns }}">- NIHIL -</th>
                    </tr>
                @endif
            </tbody>
        </table>
    </section>

    <section class="table-container" id="lainnya">
        <div class="table-title">D. PEMELIHARAAN SARANA OPERASI LAINNYA</div>

        <table class="table" cellspacing="0" cellpadding="5">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Jenis Sarana Operasi</th>
                    <th>Tipe / Merk</th>
                    <th>Jenis / Kegiatan Pemeliharaan</th>
                    <th>Tanggal Pemeliharaan</th>
                    <th>Pengganti Suku Cadang</th>
                    <th>Ket.</th>
                </tr>
            </thead>

            @php
                $columns = 7;
            @endphp

            <tbody>
                <tr>
                    @for ($i = 1; $i <= $columns; $i++)
                        <td class="text-center">{{ $i }}</td>
                    @endfor
                </tr>


                @if (count($data->operasiLainnya) > 0)
                    @foreach ($data->operasiLainnya as $lainnya)
                        <tr>
                            <td class="text-center">{{ $loop->iteration }}.</td>
                            <td class="text-center">{{ is_empty($lainnya->jenis_operasi) }}</td>
                            <td class="text-center">
                                @if (empty($lainnya->tipe))
                                    @if (empty($lainnya->merek))
                                        -
                                    @else
                                        {{ $lainnya->merek }}
                                    @endif
                                @else
                                    @if (empty($lainnya->merek))
                                        {{ $lainnya->tipe }}
                                    @else
                                        {{ $lainnya->tipe }} {{ $lainnya->merek }}
                                    @endif
                                @endif
                            </td>
                            <td class="text-center">-</td>
                            <td class="text-center">-</td>
                            <td class="text-center">-</td>
                            <td class="text-center">{{ is_empty($lainnya->catatan) }}</td>
                        </tr>
                    @endforeach
                @else
                    <tr>
                        <th colspan="{{ $columns }}">- NIHIL -</th>
                    </tr>
                @endif
            </tbody>
        </table>
    </section>
</x-layouts.sarana-operasi>
