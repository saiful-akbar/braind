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
        Schema::create('perusahaan_ht_hptl', function (Blueprint $table) {
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
            $table->string('nppbkc', 100);
            $table->integer('jumlah_ck')->unsigned();
            $table->string('jenis_bkc', 100);
            $table->decimal('jumlah', 15, 2)->unsigned();
            $table->decimal('jumlah_cukai', 15, 2)->unsigned();
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
        Schema::dropIfExists('perusahaan_ht_hptl');
    }
};
