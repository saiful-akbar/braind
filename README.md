# Dokumentasi Aplikasi

# 1. Instalasi

## 1.1. Persyaratan Sistem

- php >= 8.1
- composer >= 2.6
- node js >= 18.18
- npm >= 10.2
- database MySQL

## 1.2. Instalasi untuk pengembangan

- Clone repository

```bash
git clone https://github.com/saiful-akbar/braind.git && cd braind

```

- Jalankan file `dev.sh`

```bash
sh dev.sh

```

- Konfigurasi file `.env`
- Jalankan migrasi database (opsional)

```bash
php artisan migrate:fresh --seed

```

## 1.3. Instalasi Production

- Clone repository

```bash
git clone https://github.com/saiful-akbar/braind.git && cd braind

```

- Jalankan file `dev.sh`

```bash
sh dev.sh

```

- Konfigurasi file `.env`

  - Pastikan konfigurasi sudah diisi dengan benar.
  - Pastikan variable `APP_ENV=production`.
  - Pastikan variable `APP_DEBUG=false`.
  - Pastikan variable `APP_URL=` sesuai dengan url atau domain aplikasi.

- Jalankan migrasi database (opsional)

```bash
# Jangan jalankan migrasi jika database sudah ada, karena akan menimpa database yang sudah ada.
php artisan migrate:fresh --seed

```

- Jalankan file `build.sh`

```bash
sh build.sh

```

# 2. Panduan Pengguna

## 2.1. Navigasi

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
- Report

#### Pengaturan Akun

- Klik foto profil pada bagian bilah kiri aplikasi.
- Pilih profil untuk melihat atau memperbarui data akun pengguna.
- Pilih pengaturan untuk merubah tema aplikasi.
