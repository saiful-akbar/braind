<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('operasi_kapal_patroli', function (Blueprint $table): void {
            $table->after('tanggal_input', function (Blueprint $table): void {
                $table->string('jenis_kapal', 100)->nullable();
                $table->string('merk_tipe_mesin', 100)->nullable();
                $table->integer('jumlah_mesin')->nullable()->unsigned();
                $table->year('tahun_pembuatan')->nullable()->unsigned();
                $table->year('tahun_rehab')->nullable()->unsigned();
                $table->string('kondisi_badan_kapal', 100)->nullable();
                $table->string('kondisi_mesin_kapal', 100)->nullable();
                $table->enum('status_pengoperasian', ['Aktif', 'Tidak Aktif'])->default('Aktif');
                $table->boolean('kondisi_aktif')->default(true);
                $table->boolean('cetak')->default(true);
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('operasi_kapal_patroli', function (Blueprint $table) {
            $table->dropColumn([
                'jenis_kapal',
                'merk_tipe_mesin',
                'jumlah_mesin',
                'tahun_pembuatan',
                'tahun_rehab',
                'kondisi_badan_kapal',
                'kondisi_mesin_kapal',
                'status_pengoperasian',
                'kondisi_aktif',
            ]);
        });
    }
};
