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
                ->cascadeOnUpdate();

            // Account
            $table->string('username')->unique();
            $table->string('password');
            $table->rememberToken();

            // profile 
            $table->string('full_name', 100);
            $table->string('photo', 50)->nullable();
            $table->enum('gender', ['male', 'female'])->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('place_of_birth', 50)->nullable();

            // address
            $table->string('country', 50)->nullable();
            $table->string('city', 50)->nullable();
            $table->string('postal_code', 10)->nullable();
            $table->text('address')->nullable();

            // contact
            $table->string('phone', 15)->unique()->nullable();
            $table->string('email', 100)->unique()->nullable();
            $table->timestamp('email_verified_at')->nullable();

            // times
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
