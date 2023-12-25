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
        Schema::create('komoditi', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('kode', 100)->unique();
            $table->index('kode');
            $table->timestamps();
            $table->softDeletes();

            $table->fullText([
                'id',
                'kode',
            ], 'komoditi_fulltext');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('komoditi');
    }
};
