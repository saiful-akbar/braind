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
  git clone https://github.com/saiful-akbar/braind.git && cd braind && git checkout develop
  ```

- Jalankan file development.sh

  ```sh
  sh development.sh
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
