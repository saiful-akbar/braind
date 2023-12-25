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
        Schema::create('profil_kantor', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignUuid('kantor_id')
                ->constrained('kantor')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->text('keterangan');
            $table->text('aktifitas');
            $table->text('area_pengawasan');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profil_kantor');
    }
};
