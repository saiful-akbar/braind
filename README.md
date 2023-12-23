# Dokumentasi Aplikasi

## 1. Instalasi

- **Persyaratan Sistem**

  - php >= 8.1
  - composer >= 2.6
  - node js >= 18.18
  - npm >= 10.2
  - database MySQL atau MariaDB

- **Proses Instalasi**
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

## 2. Pengenalan Aplikasi

- **Deskripsi Aplikasi**

  - Jelaskan fungsi dan tujuan utama aplikasi.

- **Fitur Utama**
  - Data master
    - Fitur ini merupakan fitur untuk mengelola data-data dasar.

## 3. Panduan Pengguna

- **Masuk (Login)**

  - Login dengan menggunakan email dan kata sandi yang sudah terdaftar.

- **Navigasi**

  - Terdapat menu utama pada bilah kiri aplikasi untuk bernavigasi.

    - **Master**

      - Kanwil
      - Kode Komoditi
      - SBP
      - User

    - **Kanwil**

      - Profil
      - Peta Kerawanan

    - **Penerimaan**

      - Data Penerimaan

    - **Perusahaan**

      - Cukai MMEA
      - Cukai HT + HPTL
      - Ekspor
      - Impor

    - **Pengawasan**

      - Cuka MMEA
      - Cukai HT
      - Cukai EA
      - Ekspor
      - Impor
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

## 4. Note

1. Ubah nama division menjadi kantor.
2. Tampilkan hanya data transaksi hanya berdasarkan kantor yang dimiliki user yang sedang login.
