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

  - **DAshboard**

  - **Kantor**

    - Profil
    - Peta Kerawanan

  - **Data Master**

    - Kantor
    - Kode Komoditi
    - Perusahaan
    - SBP
    - User

  - **Perusahaan**

    - Cukai HT + HPTL
    - Cukai MMEA
    - Ekspor
    - Impor

  - **Penerimaan**

    - Penerimaan

  - **Pengawasan**

    - Pengawasan
    - Penindakan

  - **Sarana Operasi**

    - Alat Pemindai dan Pendeteksi
    - Alat Telekomunikasi
    - Kapal Patroli
    - Senjata Api
    - Sarana Operasi Lainnya

- **Pengaturan Akun**
  - Klik foto profil pada bagian bilah kiri aplikasi.
  - Pilih profil untuk melihat atau memperbarui data akun pengguna yang sedang login.
  - Pilih pengaturan untuk merubah tema aplikasi.

## 3. Note

- Menu profil kantor mencakup 3 komponen yakni:
  - Profil
  - Gambar
  - Video
- Menu peta kerawanan mencakup 2 komponen yakni
  - Gambar
  - Video
