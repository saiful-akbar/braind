<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PerusahaanSeeder extends Seeder
{
    private array $data = [
        [
            "id" => "9b83bebf-1325-4c84-9880-004c660fd487",
            "nama" => "ADHAR ZULHAJJI",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-5b40-4ef0-ad49-eb4ca28ab4ac",
            "nama" => "ADITYA, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-5805-46cd-ac46-49e4717d2693",
            "nama" => "AFIF MAKMUR, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-568f-4881-9904-2742b8f1f632",
            "nama" => "AGAR JAYA MAKMUR, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-545f-4574-9f68-8a09f10aa330",
            "nama" => "AGUS M JURPIN",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-51f7-4a13-bcbf-0405d2140c36",
            "nama" => "AIRAV PUTRA, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-5097-40e1-99c6-48a7d1af1b3a",
            "nama" => "AKAR SUKSES PRATAMA, PT.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-4f57-490e-ac88-07991dc52240",
            "nama" => "AL AKBAR, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-4de7-48ac-a862-9c78988701cf",
            "nama" => "ALAMSYAH DAENG PATOMPO",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-4be5-4f61-8a29-dd599c8b2ba6",
            "nama" => "AMANAH, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-4a14-4910-ab05-2cb0d7ce8c94",
            "nama" => "AMMAN MINERAL NUSA TENGGARA, PT.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-492d-4be0-b93e-ec56f5a664d3",
            "nama" => "ANSHORI, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-4844-4127-b9e3-78fb68e2f015",
            "nama" => "ANUGRAH SAHHIED, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-46dc-4f30-abb8-0983f14ea415",
            "nama" => "ANY LESTARI, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-44a0-4ebe-ad98-eab3d83f7b5d",
            "nama" => "ARKA, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-4323-4457-be5b-b888428594d0",
            "nama" => "ARPAN BALI UTAMA, PT.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-41d7-45a2-b702-438fe172aaee",
            "nama" => "ASRIL MALIK",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-4009-4d32-92a5-1627dc57d2da",
            "nama" => "ASTIDAMA ADHIMUKTI, PT.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-3e17-4abe-a180-3933c606d846",
            "nama" => "AUTORE PEARL CULTURE, PT.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-3cbf-41c5-b38c-915ad4aa62b7",
            "nama" => "AZRIL, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-3b76-41c4-9026-1401be7c05ad",
            "nama" => "BALI MOON, PT.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-3a06-46e4-b729-56325fda3225",
            "nama" => "BALINDO MITRA PERKASA, PT.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-3783-4229-bd0c-29625aed522a",
            "nama" => "BELE-BELE, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-35c9-455a-abb1-5814075b63f3",
            "nama" => "BELU BANAM , UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-3496-4345-875c-d0d9a1f476dd",
            "nama" => "BELU JATI FURNITURE, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-32e4-4446-82aa-7c26e80aec22",
            "nama" => "BERKAH ALAM (LALU THORIQ), UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-30ab-420c-b2a9-68e15906b053",
            "nama" => "BERKAT KONSTRUKSI, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-2f8f-4bbc-9efd-ccfef60bbe23",
            "nama" => "BERKAT SEJATI, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-2e93-43c9-bfff-cd7c16b630c7",
            "nama" => "BERKAT SENTOSA PREMIER, PT.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-2d03-40f9-920a-788c3904ba72",
            "nama" => "BERKAT TIMOR, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-2ae5-40ab-b41b-a401b45fab5f",
            "nama" => "BETA TIMOR, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-2917-4fd9-b1ad-01618ddd75aa",
            "nama" => "BHAKTI CITRA ABADI, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-2782-424e-9ddc-06265059c890",
            "nama" => "BINTANG TIMOR, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-256a-42d3-912b-0051f70a4723",
            "nama" => "BUNGA, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-2297-48aa-b040-9cee0d8aaab2",
            "nama" => "CAHAYA BINTANG LAUT",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-20fa-4585-9246-bd3e776ed385",
            "nama" => "CAHAYA MULIA, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-1f60-4e52-9392-47a8f5ea8e44",
            "nama" => "CAHAYA SURYA, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-1cac-43bc-adf6-cf4aaa13aad5",
            "nama" => "CAHAYA WAHYU GUNAJAYA, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-1b16-4ac8-9a49-b42d175caa0c",
            "nama" => "CENTRAL TIMOR",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-16af-4315-8699-7f8cd4afe28d",
            "nama" => "CEVA INDUSTRI INDONESIA",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-14ca-42df-9aa1-b936b258cc0a",
            "nama" => "CHAROEN POKPHAND INDONESIA",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-125a-41e1-b13c-99e0e3b35840",
            "nama" => "CHAROEN POKPHAND JAYA FARM",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-100a-459c-bff8-04040d2bce17",
            "nama" => "DAHLIA GRUP (AFFAN SHAMMAKH), UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-0eb0-416c-a382-bc95fd1e8cdf",
            "nama" => "DAMAR, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-0d93-465d-aa6a-ca44aa821863",
            "nama" => "DEALPIN, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-0c3f-4b44-9d62-e5f80bc5281b",
            "nama" => "DEDI MANDIRI, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-0a0d-4eb9-928e-73b316e99bac",
            "nama" => "DEWATA SUKSES BERSAMA, PT.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-0894-4f7f-b137-5111230299e3",
            "nama" => "DEWATARU",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-0764-43b7-9155-105c01223be1",
            "nama" => "DH E-LIQUID",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-05d3-4a2d-93a7-2dce2cf5da19",
            "nama" => "DIANSARANA BERLIAN MOTORS, PT.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-0356-4d90-aa07-4a53d624da2b",
            "nama" => "DIAS KASIH, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-0218-449e-9858-145bd3a82676",
            "nama" => "DIMAS, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-011e-4d27-a7c0-ebb9e9501aa1",
            "nama" => "DIONISIA PATRISIA ETTY BATAONA",
            "aktif" => 1
        ],
        [
            "id" => "9b83bec0-0000-4264-af57-6e27a36a1849",
            "nama" => "DONAL",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-fe67-4ad9-8ce1-3067ae0f08d6",
            "nama" => "DUA MAWAR, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-fc24-48a8-b18a-4eb20de09fc8",
            "nama" => "DUKUH LESTARI, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-fb5b-4ab3-a1f0-000accf50bf2",
            "nama" => "DUNIA BARU, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-fa6d-45c3-9df4-aae423a4acd6",
            "nama" => "EASTERN PEARL FLOUR MILLS, PT.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-f982-41e1-8ee6-f166f3e2a624",
            "nama" => "ELIM BARU, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-f844-4f87-bf37-7bba35b97d83",
            "nama" => "EMILIANA MANEK SAMARA",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-f5e1-477f-848e-616aeef9184d",
            "nama" => "FA UDIYANA",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-f497-4a11-873c-add3979d8131",
            "nama" => "FALDI, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-f361-4c72-94a7-3a0e0b27cff6",
            "nama" => "FANDI, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-f21a-48d6-a74e-c392368c6144",
            "nama" => "FARDYADI",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-efce-422d-b404-2c65ce978e7f",
            "nama" => "FAROMAS TIMOR DISTRIBUTION",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-ee9c-40f4-9509-d264c5f25728",
            "nama" => "FAROMAS TIMOR DISTRIBUTION, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-eda2-40b4-97b2-bb0fa4c80a86",
            "nama" => "FIRMADANI, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-ecaa-424a-9dba-2cd80a5fd0ce",
            "nama" => "FURAK RAI MALAKA, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-eb6b-44a9-bffb-656f94ab50d3",
            "nama" => "GAJAH MADA, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-e90f-4b74-9df4-e6af5fdf16d1",
            "nama" => "GAVEEN HANANIA",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-e7fd-4a36-a3d4-c22f1b4d1379",
            "nama" => "GIO GATRA SANJAYA, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-e72b-4491-bcfe-8b5b3c69f77f",
            "nama" => "GLOBAL MEDIA",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-e641-4e8f-ae42-f5ded7617ac7",
            "nama" => "GOD BLESS YOU, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-e514-4367-9a43-8fff8a45fa0d",
            "nama" => "GOLDEN BANGUNAN, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-e2cd-4f66-a5e8-a047c3842add",
            "nama" => "GUNUNGMAS SANTOSORAYA, PT.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-e141-4baf-8f4a-eccd11c2eb8e",
            "nama" => "GWAN GWAN HOO, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-dfcd-41ed-822b-16bc52269901",
            "nama" => "HAIRUDIN",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-de94-4931-86db-3202c606ea37",
            "nama" => "HARISNAH, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-dbf4-41ac-b530-769f9b724bba",
            "nama" => "HAST, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-da91-4ea6-a8c9-e2cd1b2c8035",
            "nama" => "HILMAN, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-d975-4947-acad-bbf6fad0401f",
            "nama" => "HULU HILIR, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-d837-4b41-997c-280f77c58225",
            "nama" => "IKHTIAR, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-d61e-4659-93bc-a1172b9af3c2",
            "nama" => "ILHAM SUKIAMAN TANDANG",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-d469-4e73-8e69-2362bbbbef42",
            "nama" => "INGAT BUDI, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-d34d-4a4d-8bdf-ad5e6be98996",
            "nama" => "INTIMAS SURYA",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-d224-419a-a7da-3eb400ec1b4c",
            "nama" => "ISHAK RIAN BEN HITTU",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-d02f-4fff-b124-1956af27c8bd",
            "nama" => "JABAL RAHMAT, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-ce16-4171-a58e-9a8bdf510e81",
            "nama" => "JAI RAPPONNA",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-ccfc-4ee6-abc1-97e3d011d12a",
            "nama" => "JANDA, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-cbcf-46c8-86ad-1e37e5b324dc",
            "nama" => "JAPFA COMFEED INDONESIA TBK, PT.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-c95c-4f94-a4eb-aebdf10e4d18",
            "nama" => "JASA PRIMA MANDIRI, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-c786-4224-bf7f-744231626af8",
            "nama" => "JAYA MAKMUR, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-c6bd-4a8c-b95e-5e10378cda44",
            "nama" => "JAYA SENTOSA, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-c5ad-4823-bd96-20117242ed28",
            "nama" => "JENAR SELAPARANG, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-c3f9-4836-82fb-07074b6d81f5",
            "nama" => "JOLIAN PUTRA, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-c1f4-4c0f-925e-302bf320d7a3",
            "nama" => "JOVI, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-c0ce-4429-b9d0-7f3fa3c9793b",
            "nama" => "KACHUGA, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-bf7d-4fd7-81f9-90d7a895afa4",
            "nama" => "KARYA BALI INDAH, PT.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-be1c-46bc-8d46-b0e126cc8dc9",
            "nama" => "KASTURI KECIAL KUNING, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-bbb3-4601-a08c-1bc72ba0aafb",
            "nama" => "KAWAN LAMA, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-ba45-4321-8a67-801a618230df",
            "nama" => "KELOMPOK TANI SUMBER TANI SATU",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-b924-4305-ac32-0b00310d5eb5",
            "nama" => "KEMBANG, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-b7ee-47c8-b281-1b99e5a8333a",
            "nama" => "KIJANG RINJANI, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-b5e4-4618-b9b5-f375ff71246e",
            "nama" => "KIOS HARUM MANIS",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-b417-4e64-a5c9-5e33ebcdd564",
            "nama" => "KIOS LOLA",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-b2dd-4f95-a37b-a6b43d1cab9a",
            "nama" => "KIRANA MAKMUR, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-b19e-48c4-a861-61eee83f7915",
            "nama" => "KOPERASI PETANI TEMBAKAU VIRGINIA",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-afdc-4952-ac29-df9fa0193a47",
            "nama" => "LANGGENG KREASI JAYAPRIMA",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-adae-4e59-b225-1719d41db165",
            "nama" => "LASAM LUFIDAV KREASI, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-ac94-487b-a9f6-71e1d7dea443",
            "nama" => "LAUT NUSANTARA JUARA, PT.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-ab34-4541-ab6d-e724e4c915c6",
            "nama" => "LIEM JAYA, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-a939-460b-95d3-52eec6e65d56",
            "nama" => "LIMA SAMUDRA, PT.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-a722-4cbb-b8b2-1ebfc85c5db6",
            "nama" => "LINTAS NEGARA EXPRESS CARGO, PT.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-a5fe-4535-99ab-1c6d75711491",
            "nama" => "LOBSTER ORIGIN PARADISE, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-a4df-42ca-8250-f9ee5742353c",
            "nama" => "LOVINA INDUSTRI SUKSES, PT.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-a385-4f8b-bd96-53b66356c201",
            "nama" => "LUMINTU, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-a107-4367-ace6-4ffc1e70aca5",
            "nama" => "M. BENY MAULANA, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-9fe9-42d0-b6bf-13b8f4e0b81d",
            "nama" => "M3 CAKRAWALA, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-9eeb-43a5-ac03-7b9370213c20",
            "nama" => "MAHA JAYA, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-9db0-4818-86f8-753c070c9a90",
            "nama" => "MAPAN JAYA, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-9c0c-4052-a00c-84a9d2a6d79b",
            "nama" => "MATSYARAJA ARNAWA STAMBHAPURA, PT.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-9a22-40ac-9a2b-969cb2b7dab3",
            "nama" => "MAWAR PUTRA, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-9950-4006-bf7f-8399924408ca",
            "nama" => "MAYA LESTARI, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-984c-4809-8fc5-76c61be26cbf",
            "nama" => "MEGA QUEENIE, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-9729-4428-b365-abd44765638a",
            "nama" => "MITRA JAYA, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-9546-49e5-a5a1-e7c05cc41980",
            "nama" => "MITRA SARANA EXPORTINDO, PT.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-9388-4379-b4eb-60d197729cb0",
            "nama" => "MITRA TIMOR, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-92bd-4f2b-89dd-dddb3d0edf6c",
            "nama" => "MORRIS LUMINTU, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-91f0-43b5-acb0-c3c8b8a3ca5d",
            "nama" => "MOYO SAFARI ABADI, PT.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-90b7-4399-8e93-421e87e62c3f",
            "nama" => "MULIA DEWATA GEMILANG, PT.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-8e6d-4af5-aa0b-5c0949003a8e",
            "nama" => "MULTI KREATIF MANDIRI, PT.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-8cef-47e4-b148-d91c1aa5092d",
            "nama" => "MURIA SUMBA MANIS, PT.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-8c1d-4d17-bf5d-85720758bf59",
            "nama" => "N & N, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-8b09-4cfe-aa1e-213de6f83814",
            "nama" => "NADA JAYA, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-89ac-4649-90a1-d4970c542e82",
            "nama" => "NAGA MAS INDONESIA, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-8756-4aaf-b8c6-ab713c84121c",
            "nama" => "NAGA MAS JAYA",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-85f7-4b50-8ba2-0721610a236a",
            "nama" => "NAGOYA, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-84dc-464e-a803-550f7ff85616",
            "nama" => "NANDA PRASTAMA AZIMI, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-8375-4da0-87b9-28a81ecb2501",
            "nama" => "NIKKI SAKE BALI",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-8117-445d-a868-e93e25010fa7",
            "nama" => "NIKMAT, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-7fb4-4233-8e8f-d00d194e5e99",
            "nama" => "NIRMALASARI",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-7ecb-4132-a9ea-74ed0b580874",
            "nama" => "NOVA, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-7d7f-4033-99aa-ecc843d60e35",
            "nama" => "NUANSA TARU BALI, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-7b5d-4931-ba66-a5c9f55642a5",
            "nama" => "PANGERAN, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-7967-4b5c-810e-e81311b4acc0",
            "nama" => "PANORAMA, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-789c-4769-be08-6a7a36bd1531",
            "nama" => "PARTHA JAYA, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-77ce-4b71-8b25-bb259ff64e94",
            "nama" => "PENDAWA, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-76aa-4624-a02a-4b45dc7bf145",
            "nama" => "PERTAMINA PATRA NIAGA, PT.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-7400-44c2-aa96-b63b91fc6f05",
            "nama" => "PERUM BULOG",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-7293-43bb-90dd-d5e814e83eb4",
            "nama" => "PESONA TIMOR, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-7190-417e-a50a-c33c7caf7502",
            "nama" => "PLANET FARM, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-6fe9-419a-a022-0809ad7ca16b",
            "nama" => "POLIGAMI, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-6d0d-4226-9279-8de6ef2e2d3c",
            "nama" => "PRASMANINDO BOGA UTAMA, PT.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-6bff-4d4f-baaf-e075de64d91a",
            "nama" => "PRIMA INVESTA NUSATENGGARA, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-6aee-4ba2-82e3-e61a93891100",
            "nama" => "PUJANGGA BANGUNAN, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-68ee-4cfe-a3ac-60d095cf1014",
            "nama" => "PUTRA KIFLI, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-6719-4b43-a4e7-4ac2da6f289f",
            "nama" => "PUTRI BERLIAN, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-65cb-40c3-ba39-d960c74c83cb",
            "nama" => "QENZY, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-6505-4978-8e6b-c26a388c4e1b",
            "nama" => "RADIA JAYA, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-640a-4bc9-b223-cb92e0c244a6",
            "nama" => "RADIA, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-6226-4b9f-b39c-ee60fe8d3701",
            "nama" => "RAFKAH, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-5fe5-44fd-aeec-a27a18aad8e6",
            "nama" => "RAIMUNDUS BESIN",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-5e9c-4cca-9e31-75afa5ce472d",
            "nama" => "REZA HERMA WIJAYA, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-5d69-4b53-a615-8c07930ce0e5",
            "nama" => "SAHRUL MANDIRI, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-5b94-4008-af26-9890850beeff",
            "nama" => "SATRIA MBAKO LINTING, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-594b-45c3-84a9-11f54126575a",
            "nama" => "SATRIA, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-5835-4663-9ef0-3bfc18e2da08",
            "nama" => "SELINGKUH, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-5716-4315-8447-4be3dc6af940",
            "nama" => "SINAR AGRO GEMILANG INDAH, PT.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-55b9-4d7d-b700-a66ec4c01446",
            "nama" => "SINAR ELIM, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-530b-4fcb-adc8-41daf9a72ab8",
            "nama" => "SINAR KASTURI, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-51ef-4f24-a0e2-fb08c05a756c",
            "nama" => "SINAR SAUDARA, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-50d4-4022-aaf6-358ec23eaec9",
            "nama" => "SINAR SILABAO",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-4f4b-4282-828a-0da1831f0dc6",
            "nama" => "SINAR TIMUR INDOJAYA, PT.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-4cab-439a-935d-63d9254257ac",
            "nama" => "SOLAH BERKAH UTAMA, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-4b40-4339-b648-7d708a622f22",
            "nama" => "SOLEHA, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-4a01-4bb1-b53b-fc93d11118f9",
            "nama" => "SUKMAWATI NINGSIH SUMARDIN",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-4841-4856-8fae-a2636a23b868",
            "nama" => "SUKSES SAUDARA, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-45c5-4626-b21a-1b67c7a3075d",
            "nama" => "SUMBER JAYA, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-4470-4f57-88e4-ecf253589fdd",
            "nama" => "SUMBER SAUDARA, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-4318-44b1-8e1b-55aa040394a1",
            "nama" => "SUPRIADY",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-408d-4d03-ad27-5569a2b70674",
            "nama" => "SURYA CITRA TIMOR, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-3ea9-4f84-972d-16cfe1025f2d",
            "nama" => "SURYA MAS, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-3d9c-4818-aacd-916e337883bc",
            "nama" => "SYIFA TRANS, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-3c4c-400a-95d5-bafdebc8c83c",
            "nama" => "TEGUH MANDIRI, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-39a1-48b0-96fc-f29e53600e1a",
            "nama" => "TESCO SENTOSA, PT.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-37f7-471a-87b9-2dc003154a8a",
            "nama" => "TIGA MUDA, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-36ca-4113-b9b3-f5359feef691",
            "nama" => "TIGA PUTRI, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-3544-4aa3-ad25-ee03d935aba3",
            "nama" => "TIMOR CARGO, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-32a6-4df7-ac81-6215427d29bb",
            "nama" => "TIMOR DISTRINDO, PT.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-313c-4478-ab38-1c9957e580ea",
            "nama" => "TIMOR MANDIRI SEJAHTERA",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-301b-4e5c-8eda-4b482b484563",
            "nama" => "TIMORINDO JAYA MAKMUR, PT.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-2df0-4719-a73f-34a023f42064",
            "nama" => "TIRHANA, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-2bce-4473-b86a-02708988e96c",
            "nama" => "TUGU ABADI PERKASA, PT.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-2a91-4d37-a1ee-be73a3ac7f4f",
            "nama" => "TUNAS KARYA, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-294a-4314-8a08-2eb4873f468a",
            "nama" => "TUNAS MAS, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-2771-417c-a050-565c8da0859e",
            "nama" => "UD. ITA WANGI, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-24f5-46d0-a404-7bbf6a609cfe",
            "nama" => "UD. PADE ANGEN, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-2401-4a27-ae93-bad52bb50f93",
            "nama" => "ULBARZA, PD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-22ec-4588-8ff9-474daed60563",
            "nama" => "VESPA, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-2145-42dd-9d84-5b71990ef7c9",
            "nama" => "VIDA NOVA, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-1ec2-4b01-9e8a-9e30be61cbfa",
            "nama" => "WAHYU, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-1d7c-45ca-8098-fa2c508b8f4b",
            "nama" => "WICO INTERNA, PT.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-1c23-414b-92d4-4cc081543bbb",
            "nama" => "YENI JAYA, UD.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-19a5-4420-931b-f12c04f1cd21",
            "nama" => "YUNITA ANUGRAH, CV.",
            "aktif" => 1
        ],
        [
            "id" => "9b83bebf-17c4-4cca-9f27-baf9504ae3cc",
            "nama" => "ZAKIR SALMA, CV.",
            "aktif" => 1
        ]
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->data as $data) {
            DB::table('perusahaan')->insert([
                'id' => $data['id'],
                'nama' => $data['nama'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
