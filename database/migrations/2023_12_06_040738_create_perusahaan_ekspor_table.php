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
        Schema::create('perusahaan_ekspor', function (Blueprint $table) {
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

            $table->string('nama_perusahaan', 50);
            $table->string('npwp', 20);
            $table->integer('peb')->unsigned()->comment('Pemberitahuan Ekspor Barang');
            $table->double('bruto')->unsigned();
            $table->double('netto')->unsigned();
            $table->double('devisa')->unsigned();
            $table->double('bea_keluar')->unsigned();
            $table->integer('jumlah_liter')->unsigned()->default(0);
            $table->double('jumlah_cukai')->unsigned()->default(0);
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
        Schema::dropIfExists('perusahaan_ekspor');
    }
};
