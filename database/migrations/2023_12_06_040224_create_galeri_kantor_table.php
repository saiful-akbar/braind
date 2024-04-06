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
        Schema::create('galeri_kantor', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignUuid('kantor_id')
                ->constrained('kantor')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->string('video_url')->nullable();
            $table->string('gambar_url')->nullable();
            $table->string('mime_type', 50)->nullable();
            $table->enum('tipe', ['galeri', 'peta'])->nullable();
            $table->string('judul', 50)->nullable();
            $table->string('keterangan')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('galeri_kantor');
    }
};
