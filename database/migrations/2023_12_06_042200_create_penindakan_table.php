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
        Schema::create('penindakan', function (Blueprint $table) {
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

            $table->string('kppbc', 100);
            $table->string('nomor_sbp', 100);
            $table->date('tanggal_sbp');
            $table->string('kode_komoditi', 50);
            $table->decimal('jumlah', 17, 2)->unsigned();
            $table->string('uraian');
            $table->decimal('perkiraan_nilai_barang', 17, 2)->unsigned();
            $table->decimal('potensi_kurang_bayar', 17, 2)->unsigned();
            $table->string('tindak_lanjut', 100);
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
        Schema::dropIfExists('penindakan');
    }
};
