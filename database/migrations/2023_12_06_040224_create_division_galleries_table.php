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
        Schema::create('division_galleries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('division_id')->constrained();
            $table->string('url');
            $table->string('uri');
            $table->string('mime_type', 50);
            $table->string('type', 2);
            $table->string('title', 50)->nullable();
            $table->string('description')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('division_galleries');
    }
};
