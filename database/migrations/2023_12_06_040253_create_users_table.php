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

            $table->foreignUuid('kantor_id')
                ->nullable()
                ->constrained('kantor')
                ->nullOnDelete()
                ->cascadeOnUpdate();

            // Account
            $table->string('username')->unique();
            $table->string('password');
            $table->enum('role', ['admin', 'kanwil'])->default('kanwil');
            $table->rememberToken();

            // profile 
            $table->string('nama_lengkap', 100);
            $table->string('foto', 50)->nullable();
            $table->enum('jenis_kelamin', ['l', 'p'])->nullable();
            $table->date('tanggal_lahir')->nullable();
            $table->string('tempat_lahir', 50)->nullable();

            // address
            $table->string('negara', 50)->nullable();
            $table->string('kota', 50)->nullable();
            $table->string('kode_pos', 10)->nullable();
            $table->text('alamat')->nullable();

            // contact
            $table->string('telepon', 15)->unique()->nullable();
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
