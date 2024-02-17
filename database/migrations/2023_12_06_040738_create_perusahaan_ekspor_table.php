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

            $table->string('nama_perusahaan', 100);
            $table->string('npwp', 20);
            $table->integer('peb')->unsigned()->comment('Pemberitahuan Ekspor Barang');
            $table->decimal('bruto', 17, 2)->unsigned();
            $table->decimal('netto', 17, 2)->unsigned();
            $table->decimal('devisa', 17, 2)->unsigned();
            $table->decimal('bea_keluar', 17, 2)->unsigned();
            $table->integer('jumlah_liter')->unsigned()->default(0);
            $table->decimal('jumlah_cukai', 17, 2)->unsigned()->default(0);
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
