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
        Schema::create('division_profiles', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('division_id')->constrained();
            $table->text('description');
            $table->text('activity');
            $table->text('surveillance_area');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('division_profiles');
    }
};
