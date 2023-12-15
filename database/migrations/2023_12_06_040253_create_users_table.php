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
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignUuid('division_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete()
                ->restrictonUpdate();

            $table->string('name', 50);
            $table->enum('sex', ['l', 'p'])->nullable();
            $table->string('place_of_birth', 50)->nullable();
            $table->date('birth_date')->nullable();
            $table->string('phone', 15)->nullable();
            $table->string('role', 6)->default('kanwil');
            $table->string('instagram', 30)->nullable();
            $table->string('avatar')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
