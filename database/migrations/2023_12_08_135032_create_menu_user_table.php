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
        Schema::create('menu_user', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignUuid('menu_id')
                ->constrained()
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->foreignUuid('user_id')
                ->constrained()
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->boolean('create')->default(false)->comment('Akses untuk membuat');
            $table->boolean('read')->default(false)->comment('Akses untuk melihat');
            $table->boolean('update')->default(false)->comment('Akses untuk edit');
            $table->boolean('remove')->default(false)->comment('Akses untuk hapus');
            $table->boolean('destroy')->default(false)->comment('Akses untuk hapus permanen');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menu_user');
    }
};
