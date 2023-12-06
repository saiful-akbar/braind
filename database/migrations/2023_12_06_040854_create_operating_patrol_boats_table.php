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
        Schema::create('operating_patrol_boats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('division_id')->nullable()->constrained();
            $table->string('hull_number', 30);
            $table->string('condition');
            $table->string('spb_number', 30);
            $table->date('spb_date', 30);
            $table->string('spb_publisher', 30);
            $table->smallInteger('day_amount');
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
        Schema::dropIfExists('operating_patrol_boats');
    }
};
