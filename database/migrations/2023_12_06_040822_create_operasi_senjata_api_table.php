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
        Schema::create('operasi_senjata_api', function (Blueprint $table) {
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

            $table->string('jenis_kaliber', 30);
            $table->string('nomor_senjata', 30);
            $table->string('nama_pemegang_senjata', 50);
            $table->string('pangkat_pemegang_senjata', 50);
            $table->string('jabatan_pemegang_senjata', 50);
            $table->string('nomor_buku_pas', 30);
            $table->string('masa_berlaku', 30);
            $table->string('kondisi', 50);
            $table->integer('jumlah_amunisi');
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
        Schema::dropIfExists('operasi_senjata_api');
    }
};
