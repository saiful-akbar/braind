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
        Schema::create('operasi_alat_pemindai', function (Blueprint $table) {
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

            $table->string('pemindai', 30);
            $table->string('nama_alat', 50);
            $table->string('ukuran', 10);
            $table->string('merek', 30);
            $table->string('tipe', 20);
            $table->string('nomor_seri', 30);
            $table->enum('tampilan', ['Tunggal', 'Ganda']);
            $table->year('tahun_perolehan');
            $table->string('kondisi', 50);
            $table->string('lokasi_penempatan', 50);
            $table->time('jam_operasi');
            $table->time('jam_pemindaian');
            $table->smallInteger('jumlah_pemindaian')->unsigned();
            $table->string('hasil_keluaran')->nullable();
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
        Schema::dropIfExists('operasi_alat_pemindai');
    }
};
