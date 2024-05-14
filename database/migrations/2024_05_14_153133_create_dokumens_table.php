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
        Schema::create('dokumen', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignUuid('kantor_id')
                ->constrained('kantor')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->date('tanggal');
            $table->string('jenis_dokumen', 100);
            $table->text('keterangan')->nullable();
            $table->string('file', 100);
            $table->string('mime_type', 30);
            $table->string('extension', 6);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dokumen');
    }
};
