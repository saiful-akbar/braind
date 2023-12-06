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
        Schema::create('operating_firearms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('division_id')->nullable()->constrained();
            $table->string('caliber_type', 30);
            $table->string('weapon_number', 30);
            $table->string('weapon_holder_name', 50);
            $table->string('weapon_holder_rank', 20)->nullable();
            $table->string('weapon_holder_position', 20);
            $table->string('pass_book_number', 30);
            $table->string('validity_period', 30);
            $table->string('condition');
            $table->double('ammo_amount');
            $table->string('notes');
            $table->date('input_date');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('operating_firearms');
    }
};
