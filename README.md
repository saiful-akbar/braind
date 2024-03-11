# Dokumentasi Aplikasi

## 1. Instalasi

- **Persyaratan Sistem**

  - php >= 8.1
  - composer >= 2.6
  - node js >= 18.18
  - npm >= 10.2
  - database MySQL atau MariaDB

- **Instalasi untuk pengembangan**
  - Clone repository
    ```bash
    git clone https://github.com/saiful-akbar/braind.git
    ```
  - Beralih ke branch develop (untuk instalasi pengembangan)
    ```bash
    cd braind && git checkout develop
    ```
  - Jalankan file dev.sh
    ```sh
    sh dev.sh
    ```
  - Buat database dan Atur konfigurasi pada file `.env`, lalu jalankan migrasi
    ```bash
    php artisan migrate:fresh --seed
    ```
  - Jalankan local server
    ```bash
    npm run dev
    ```

## 2. Panduan Pengguna

- **Masuk (Login)**

  - Login dengan menggunakan username dan kata sandi yang sudah terdaftar.

- **Navigasi**

  - **Master**

    - Kantor
    - Kode Komoditi
    - Perusahaan
    - SBP
    - User

  - **Perusahaan**

    - Cukai MMEA
    - Cukai HT + HPTL
    - Ekspor
    - Impor

  - **Kantor**

    - Profil
    - Peta Kerawanan

  - **Data Penerimaan**

    - Penerimaan

  - **Data Pengawasan**

    - Pengawasan
    - Penindakan

  - **Sarana Operasi**

    - Alat Telekomunikasi
    - Alat Pemindai dan Pendeteksi
    - Kapal Patroli
    - Sarana Operasi Lainnya
    - Senjata Api

- **Pengaturan Akun**
  - Klik foto profil pada bagian bilah kiri aplikasi
  - Pilih profil untuk melihat atau memperbarui data akun pengguna yang sedang login.

## 3. Note

1. Buat seeder untuk kantor dan user berdasarkan data dari excel.
2. Peta kerawanan kantor merupakan galeri foto dan video dari kantor.
3. video yang di upload merupakan link dari youtube.
4. ubah data 5 besar perusahaan pada dashbord menjadi chart.
5. tambahan fitu report: laporan dalam bentuk pdf untuk setiap data atau menu.

# 4. Perbaikan

- [x] Nilai Minus Cukai (kerugian) pada tabel pengawasan diperbolehkan.
- [x] Data Perusahaan/Export : klik filter > lari ke Data Perusahaan/Import
- [x] Data Perusahaan/Import : klik filter > lari ke Data Perusahaan/Export
- [x] Import data tanggal input lama bagaimana implemntasinya, blm dicoba sih br pake tgl input periode 2024?
- [x] Tabel Pemindai (cek menu import) tuk yg ini gw blm bisa lanjut isi yh
  - [x] Jam operasi > bnyknya jam yh
  - [x] Jumlah Pemindaian > bisa lebih dr 1000
  - [x] There was an error on row 2. Bidang ukuran harus berupa string.
  - [x] There was an error on row 2. Bidang nomor seri harus berupa string.
  - [x] There was an error on row 2. Bidang hasil keluaran harus berupa string.
- [x] Senjata Api
  - [x] There was an error on row 2. Bidang masa berlaku harus merupakan bilangan bulat. (seharusnya isian tanggal)
  - [x] Jumlah amunisi boleh lebih dr 1000
