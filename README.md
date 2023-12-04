# Braind Application

## 1. Requirements

- PHP >= 7.3
- node v12.22.12
- mysql 5.7

## 2. How to install

- Clone

  ```bash
  git clone git@github.com:mafaaza/brain.git

  ```

- Install Package

  ```bash
  composer install && yarn

  ```

- Run PHP Service

  ```bash
  php -S localhost:8000 -t public
  ```

- Run Client

  ```bash
  yarn dev
  ```

- Deployment

  ```bash
  sh build.sh
  ```

## 3. Fix

### 3.1. Modul

1. Memperbaiki menu pada admin yang sebelumnya tidak muncul.
2. Memperbaiki link pada children menu yang sebelumnya hanya mengarah pada path `/`.

### 3.2. Data Perusahaan

1. Memberika titik atau koma pada angka.
2. Menambahkan 2 angka dibelakang koma.
3. Merubah sub menu **Cukai HT + HTPL** menjadi **Cukai HT + HPTL**.
4. Merubah sub menu cukai HT + HTPL pada table jenis BKC menjadi format text.

### 3.3. Data Pengawasan

1. Menambahkan titik koma dan 2 angka dibelakang koma agar selaras dengan data lainnya.
2. Menyembunyikan tabel **Total Kerugian** untuk sementara pada menu **Cukai MMEA**, **Cukai HT** dan **Cukai EA** dikarenakan nominal tersebut sama dengan tabel **Potensi Kerugian Negara**.

### 3.4. Data Pengoperasian

1. Merubah menu **Data Pengoperasian** menjadi **Sarana Operasi**.
2. Memberbaiki format titik koma dan angka dibelakang koma untuk tabel harga perolehan.
3. Merubah format pada sub menu senjata api pada kolom jumlah amunisi menjadi format angka.
