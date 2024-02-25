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

  - Login dengan menggunakan email dan kata sandi yang sudah terdaftar.

- **Navigasi**

  - Terdapat menu utama pada bilah kiri aplikasi untuk bernavigasi.

    - **Master**

      - Kantor
      - Kode Komoditi
      - Perusahaan
      - SBP
      - User

    - **Kantor**

      - Profil
      - Peta Kerawanan

    - **Data Penerimaan**

      - Penerimaan

    - **Perusahaan**

      - Cukai MMEA
      - Cukai HT + HPTL
      - Ekspor
      - Impor

    - **Data Pengawasan**

      - Pengawasan

    - **Data Penindakan**

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

1. Buat master perusahaan untuk dijadikan selection saat menambah atau merubah data perusahaan. Jangan buat relasi antar tabel dengan master perusahaan, simpan saja karakter stringnya.
2. Buat filter periode otomatis (start_period = tanggal 1bulan saat ini, end_period = tanggal saat ini) saat awal menu dibuka.
3. Untuk tabel SBP data tidak bertambah, data SBP hanya sesuai dengan jumlah kantor yang ada. untuk mencatat history buat tabel baru `sbp_history`. Jika ada penambahan data SBP dengan kantor yang sudah ada pindahkan data yang lama ke tabel `sbp_history`.
