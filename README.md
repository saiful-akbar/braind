# Dokumentasi Aplikasi

## 1. Instalasi

### 1.1. Persyaratan Sistem

- php >= 8.1
- composer >= 2.6
- node js >= 18.18
- npm >= 10.2
- database MySQL

## 2. Panduan Pengguna

### 2.1. Navigasi

#### Dashboard

#### Kantor

- Profil
- Galeri
- Peta Kerawanan

#### Data Master

- Kantor
- Kode Komoditi
- Perusahaan
- SBP
- User

#### Data Perusahaan

- Cukai HT + HPTL
- Cukai MMEA
- Ekspor
- Impor

#### Data Penerimaan

- Penerimaan

#### Data Pengawasan

- Pengawasan
- Penindakan

#### Sarana Operasi

- Alat Pemindai dan Pendeteksi
- Alat Telekomunikasi
- Kapal Patroli
- Senjata Api
- Sarana Operasi Lainnya

#### Pengaturan Akun

- Klik foto profil pada bagian bilah kiri aplikasi.
- Pilih profil untuk melihat atau memperbarui data akun pengguna.
- Pilih pengaturan untuk merubah tema aplikasi.

# Fitur Laporan

- [x] Tambahakan field baru pada tabel operasi_kapal_patroli
  - Jenis Kapal
  - Merk Tipe Mesin
  - Jumlah Mesin
  - Tahun Pembuatan
  - Tahun Rehab
  - Kondisi Badan Kapal
  - Kondisi Mesin Kapal
  - Status Pengoperasian (aktif/tidak aktif)
  - Kondisi Aktif
- [x] Tambahkan field `cetak` disemua tabel sarana operasi untuk menetuka apakah data ini dicetak atau tidak.
- [x] Tambah menu Report dalam group sarana operasi
- [ ] Menu report hanya menampilkan modal untuk input `nomor`, `tanggal cetak` dan `waktu pelaporan`.
- [ ] laporan terbagi menjadi 3 format
  - [ ] Format 1 `Laporan Pengoperasian Sarana Operasi`
  - [ ] Formar 2 `Rekapitulasi Monitoring Sarana Operasi`
  - [ ] Formar 3 `Daftar Pemeliharan Sarana Operasi`
- [ ] Dalam 1 format laporan mencakup semua laporan sarana operasi.
- [ ] Cetak laporan hanya data yang sesuai dengan kantor user yang sedang login.
