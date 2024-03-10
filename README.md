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

  - Terdapat menu utama pada bilah kiri aplikasi untuk bernavigasi.

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
  - Pilih akun untuk melihat atau memperbarui data akun pengguna yang sedang login.

## 3. Note

1. Buat master perusahaan untuk dijadikan selection saat menambah atau merubah data perusahaan. Jangan buat relasi antar tabel dengan master perusahaan, simpan saja karakter stringnya.
2. Buat filter periode otomatis (start_period = tanggal 1bulan saat ini, end_period = tanggal saat ini) saat awal menu dibuka.
3. Untuk tabel SBP data tidak bertambah, data SBP hanya sesuai dengan jumlah kantor yang ada. untuk mencatat history buat tabel baru `sbp_history`. Jika ada penambahan data SBP dengan kantor yang sudah ada pindahkan data yang lama ke tabel `sbp_history`.

# 4. Fixing

- [x] Nilai Minus Cukai (kerugian) pada tabel pengawasan diperbolehkan.
- [x] Data Perusahaan/Export : klik filter > lari ke Data Perusahaan/Import
- [x] Data Perusahaan/Import : klik filter > lari ke Data Perusahaan/Export
- [x] Import data tanggal input lama bagaimana implemntasinya, blm dicoba sih br pake tgl input periode 2024?
- [ ] Tabel Pemindai (cek menu import) tuk yg ini gw blm bisa lanjut isi yh
  - [ ] Jam operasi > bnyknya jam yh
  - [x] Jumlah Pemindaian > bisa lebih dr 1000
  - [x] There was an error on row 2. Bidang ukuran harus berupa string.
  - [x] There was an error on row 2. Bidang nomor seri harus berupa string.
  - [x] There was an error on row 2. Bidang hasil keluaran harus berupa string.
- [ ] Senjata Api
  - [x] There was an error on row 2. Bidang masa berlaku harus merupakan bilangan bulat. (seharusnya isian tanggal)
  - [x] Jumlah amunisi boleh lebih dr 1000
