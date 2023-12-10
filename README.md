Braind

# 1. Persyaratan

- php >= 8.1
- composer >= 2.6
- node js >= 20.10
- npm >= 10.2
- database MySQL atau MariaDB

# 2. Instalasi

## 2.1. Pengembangan

- Clone repository

  ```bash
  git clone https://github.com/saiful-akbar/braind.git
  cd braind
  git checkout develop
  ```

- Jalankan file dev.sh

  ```sh
  sh dev.sh
  ```

- Atur konfigurasi database pada file `.env`

- Buat database dan jalankan migrasi

  ```bash
  php artisan migrate:fresh --seed
  ```

- Jalankan local server

  ```bash
  npm run dev
  ```

# Menu

- Master

  - Kanwil
  - SBP
  - User
  - Kode Komoditi

- Kanwil

  - Profile
  - Peta Kerawanan

- Penerimaan

  - Data Penerimaan

- Perusahaan

  - Perusahaan Impor
  - Perusahaan Ekspor
  - Cukai MMEA
  - Cukai HT + HPTL

- Pengawasan

  - Pengawasan Impor
  - Pengawasan Ekspor
  - Pengawasan Cuka MMEA
  - Pengawasan Cukai HT
  - Pengawasan Cukai EA
  - Pengawasan Penindakan

- Sarana Operasi
  - Kapal Patroli
  - Alat Telekomunikasi
  - Senjata Api
  - Alat Pemindai dan Pendeteksi
  - Sarana Operasi Lainnya
