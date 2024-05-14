<x-layouts.sarana-operasi title="Laporan Pengoperasian Sarana Operasi (LPSO)">
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
        LAPORAN PENGOPERASIAN SARANA OPERASI (LPSO) <br /> BULAN {{ strtoupper($bulan_pelaporan) }} TAHUN
        {{ $tahun_pelaporan }}
    </x-slot:jenis-laporan>

    <section id="operasiKapalPatroli">
        <div class="table-title">
            A. PENGOPERASIAN KAPAL PATROLI
        </div>

        <table class="table" cellspacing="0" cellpadding="5" width="100%">
            <tr>
                <th rowspan="2">No.</th>
                <th rowspan="2">Nomor Lambung</th>
                <th colspan="2">Kondisi</th>
                <th rowspan="2">Nomor SPP</th>
                <th rowspan="2">Tanggal SPP</th>
                <th rowspan="2">Penerbit SPP</th>
                <th rowspan="2">Jumlah Hari</th>
                <th rowspan="2">Ket</th>
            </tr>

            <tr>
                <th>Aktif</th>
                <th>Tidak Aktif</th>
            </tr>

            <tr>
                @for ($i = 1; $i <= 9; $i++)
                    <td class="text-center">{{ $i }}</td>
                @endfor
            </tr>
            @if (count($data->operasiKapalPatroli) > 0)
                @foreach ($data->operasiKapalPatroli as $kapalPatroli)
                    <tr>
                        <td class="text-center">{{ $loop->iteration }}.</td>
                        <td class="text-center">{{ is_empty($kapalPatroli->nomor_lambung) }}</td>
                        <td class="text-center">{{ $kapalPatroli->kondisi_aktif ? 'Aktif' : '-' }}</td>
                        <td class="text-center">{{ !$kapalPatroli->kondisi_aktif ? 'Tidak AKtif' : '-' }}</td>
                        <td class="text-center">{{ is_empty($kapalPatroli->nomor_spb) }}</td>
                        <td class="text-center">{{ is_empty($kapalPatroli->tanggal_spb) }}</td>
                        <td class="text-center">{{ is_empty($kapalPatroli->penerbit_spb) }}</td>
                        <td class="text-center">{{ is_empty($kapalPatroli->jumlah_hari) }}</td>
                        <td class="text-center">{{ is_empty($kapalPatroli->catatan) }}</td>
                    </tr>
                @endforeach
            @else
                <tr>
                    <th colspan="9">- NIHIL -</th>
                </tr>
            @endif
        </table>
    </section>

    <section id="operasiAlatTelekomunikasi">
        <div class="table-title">
            B. PENGOPERASIAN ALAT TELEKOMUNIKASI
        </div>

        <table class="table" cellspacing="0" cellpadding="5" width="100%">
            <tr>
                <th>No.</th>
                <th>Kode Barang</th>
                <th>NUP</th>
                <th>Nama Barang Pada SIMAK BMN</th>
                <th>Jenis Perangkat Telekomunikasi</th>
                <th>Harga Perolehan</th>
                <th>Tahun Perolehan</th>
                <th>Merk</th>
                <th>Tipe</th>
                <th>Range Frekuensi</th>
                <th>Teknologi (Analog/Digital)</th>
                <th>Kondisi (B/RR/RB)</th>
                <th>Status (Aktif/Tidak Aktif)</th>
                <th>Lokasi Penempatan</th>
                <th>Ket</th>
            </tr>

            <tr>
                @for ($i = 1; $i <= 15; $i++)
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
                        <td class="text-center">{{ is_empty($alatTelekomunikasi->status) }}</td>
                        <td class="text-center">{{ is_empty($alatTelekomunikasi->lokasi_penempatan) }}</td>
                        <td class="text-center">{{ is_empty($alatTelekomunikasi->catatan) }}</td>
                    </tr>
                @endforeach
            @else
                <tr>
                    <th colspan="15">- NIHIL -</th>
                </tr>
            @endif
        </table>
    </section>

    <section id="operasiSenjataApi">
        <div class="table-title">
            C. PENGOPERASIAN SENJATA API
        </div>

        <table class="table" cellspacing="0" cellpadding="5" width="100%">
            <tr>
                <th rowspan="2">No.</th>
                <th colspan="3">Senjata Api Dinas</th>
                <th rowspan="2">Berlaku S/D</th>
                <th rowspan="2">Kondisi (B/RR/RB)</th>
                <th colspan="3">Pemegang Senjata</th>
                <th rowspan="2">Jumlah Amunisi</th>
                <th rowspan="2">Ket</th>
            </tr>

            <tr>
                <th>Jenis Kaliber</th>
                <th>Nomor Senjata</th>
                <th>Nomor Buku Pas</th>
                <th>Nama</th>
                <th>Pangkat</th>
                <th>Jabatan</th>
            </tr>

            <tr>
                @for ($i = 1; $i <= 11; $i++)
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
                        <td class="text-center">{{ is_empty($senjataApi->catatan) }}</td>
                    </tr>
                @endforeach
            @else
                <tr>
                    <th colspan="11">- NIHIL -</th>
                </tr>
            @endif
        </table>
    </section>

    <section id="operasiAlatPemindai">
        <div class="table-title">
            D. PENGOPERASIAN ALAT PEMINDAI DAN PENDETEKSI
        </div>

        <table class="table" cellspacing="0" cellpadding="5" width="100%">
            <tr>
                <th rowspan="2">No.</th>
                <th rowspan="2">Pemindai/Pendeteksi</th>
                <th rowspan="2">Nama Alat</th>
                <th colspan="8">Jenis Sarana Operasi</th>
                <th colspan="4">Pengoperasian</th>
                <th rowspan="2">Ket</th>
            </tr>

            <tr>
                <th>Ukuran Alat</th>
                <th>Merk</th>
                <th>Tipe</th>
                <th>Nomor Seri Mesin</th>
                <th>Single/Dual View</th>
                <th>Tahun Perolehan</th>
                <th>Kondisi (B/RR/RB)</th>
                <th>Lokasi Penempatan</th>
                <th>Jam Operasi</th>
                <th>Jam Scan</th>
                <th>Jumlah Scan</th>
                <th>Output (NHI/SBP/Tagihan BM dan PDRI)</th>
            </tr>

            <tr>
                @for ($i = 1; $i <= 16; $i++)
                    <td class="text-center">{{ $i }}</td>
                @endfor
            </tr>

            @if (count($data->operasiAlatPemindai) > 0)
                @foreach ($data->operasiAlatPemindai as $alatPemindai)
                    <tr>
                        <td class="text-center">{{ $loop->iteration }}.</td>
                        <td class="text-center">{{ is_empty($alatPemindai->pemindai) }}</td>
                        <td class="text-center">{{ is_empty($alatPemindai->nama_alat) }}</td>
                        <td class="text-center">{{ is_empty($alatPemindai->ukuran) }}</td>
                        <td class="text-center">{{ is_empty($alatPemindai->merek) }}</td>
                        <td class="text-center">{{ is_empty($alatPemindai->tipe) }}</td>
                        <td class="text-center">{{ is_empty($alatPemindai->nomor_seri) }}</td>
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
                        <td class="text-center">{{ is_empty($alatPemindai->hasil_keluaran) }}</td>
                        <td class="text-center">{{ is_empty($alatPemindai->catatan) }}</td>
                    </tr>
                @endforeach
            @else
                <tr>
                    <th colspan="16">- NIHIL -</th>
                </tr>
            @endif
        </table>
    </section>

    <section id="operasiLainnya">
        <div class="table-title">
            E. PENGOPERASIAN SARANA OPERASI LAINNYA
        </div>

        <table class="table" cellspacing="0" cellpadding="5" width="100%">
            <tr>
                <th rowspan="2">No.</th>
                <th rowspan="2">Jenis Sarana Operasi</th>
                <th rowspan="2">Tipe/Merk</th>
                <th rowspan="2">Lokasi Penempatan</th>
                <th colspan="2">Kondisi</th>
                <th rowspan="2">Ket</th>
            </tr>

            <tr>
                <th>Aktif</th>
                <th>Tidak Aktif</th>
            </tr>

            <tr>
                @for ($i = 1; $i <= 7; $i++)
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
                        <td class="text-center">{{ is_empty($lainnya->lokasi_penempatan) }}</td>
                        <td class="text-center">
                            {{ strtolower($lainnya->kondisi) == 'aktif' ? 'Aktif' : '-' }}
                        </td>
                        <td class="text-center">
                            {{ strtolower($lainnya->kondisi) != 'aktif' ? 'Tidak Aktif' : '-' }}
                        </td>
                        <td class="text-center">{{ is_empty($lainnya->catatan) }}</td>
                    </tr>
                @endforeach
            @else
                <tr>
                    <th colspan="7">- NIHIL -</th>
                </tr>
            @endif
        </table>
    </section>
</x-layouts.sarana-operasi>
