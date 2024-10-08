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
        Schema::create('penerimaan', function (Blueprint $table) {
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

            $table->decimal('target_bea_masuk', 17, 2)->unsigned();
            $table->decimal('realisasi_bea_masuk', 17, 2)->unsigned();
            $table->decimal('target_bea_keluar', 17, 2)->unsigned();
            $table->decimal('realisasi_bea_keluar', 17, 2)->unsigned();
            $table->decimal('target_cukai', 17, 2)->unsigned();
            $table->decimal('realisasi_cukai', 17, 2)->unsigned();
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
        Schema::dropIfExists('penerimaan');
    }
};
