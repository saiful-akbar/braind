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
        Schema::create('perusahaan_impor', function (Blueprint $table) {
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
            $table->integer('pib')->unsigned()->comment('Pemberitahuan Impor Barang');
            $table->decimal('pembayaran_bea_masuk', 17, 2)->unsigned();
            $table->decimal('netto', 17, 2)->unsigned();
            $table->decimal('bruto', 17, 2)->unsigned();
            $table->decimal('total_pembayaran', 17, 2)->unsigned();
            $table->decimal('bea_masuk', 17, 2)->unsigned()->nullable();
            $table->decimal('tanggal_input', 17, 2);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('perusahaan_impor');
    }
};
