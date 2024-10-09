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
        Schema::create('kiriman', function (Blueprint $table) {
            $table->uuid('id')->primary();

            // foreign key ke tabel ekspedisi
            $table->foreignUuid('ekspedisi_id')
                ->nullable()
                ->constrained('ekspedisi')
                ->cascadeOnUpdate()
                ->restrictOnDelete();

            $table->string('ekspedisi_asal', 100)->nullable();
            $table->string('ekspedisi_asal_no_resi', 100)->nullable()->index();
            $table->enum('jenis_kiriman', ['Domestik', 'Internasional'])->nullable();
            $table->string('partner', 100)->nullable();
            $table->string('resi_nomor', 100)->nullable()->index();
            $table->date('resi_tanggal')->nullable();
            $table->string('pengirim_id', 100)->nullable()->index();
            $table->string('pengirim_nama', 100)->nullable();
            $table->text('pengirim_alamat')->nullable();
            $table->string('pengirim_no_tlp', 20)->nullable();
            $table->string('pengirim_asal_negara', 100)->nullable();
            $table->string('pengirim_asal_kota', 100)->nullable();
            $table->string('pengirim_asal_kecamatan', 100)->nullable();
            $table->string('penerima_id', 100)->nullable()->index();
            $table->string('penerima_nama', 100)->nullable();
            $table->text('penerima_alamat')->nullable();
            $table->string('penerima_no_tlp', 20)->nullable();
            $table->string('penerima_tujuan_negara', 100)->nullable();
            $table->string('penerima_tujuan_kota', 100)->nullable();
            $table->string('penerima_tujuan_kecamatan', 100)->nullable();
            $table->text('penerima_catatan')->nullable();
            $table->string('barang_nama', 100)->nullable();
            $table->string('barang_berat', 20)->nullable();
            $table->integer('barang_koli')->unsigned()->nullable();
            $table->string('barang_penerima', 100)->nullable();
            $table->date('barang_tanggal_terima')->nullable();
            $table->string('jenis_layanan', 100)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kiriman');
    }
};
