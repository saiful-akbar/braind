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
        Schema::create('operasi_alat_telekomunikasi', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignUuid('user_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete()
                ->cascadeOnUpdate();


            $table->foreignUuid('kantor_id')
                ->nullable()
                ->constrained('kantor')
                ->nullOnDelete()
                ->cascadeOnUpdate();

            $table->string('nama_barang', 100);
            $table->string('kode_barang', 20);
            $table->string('nup', 20);
            $table->string('jenis_perangkat', 30);
            $table->decimal('harga_perolehan');
            $table->year('tahun_perolehan');
            $table->string('merek', 50);
            $table->string('tipe', 50);
            $table->string('rentang_frekuensi', 20);
            $table->string('teknologi_digital', 30);
            $table->string('kondisi', 20);
            $table->string('status', 30);
            $table->string('lokasi_penempatan', 50);
            $table->string('catatan')->nullable();
            $table->date('tanggal_input');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('operasi_alat_telekomunikasi');
    }
};
