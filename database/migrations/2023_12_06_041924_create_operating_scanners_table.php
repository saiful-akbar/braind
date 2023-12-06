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
        Schema::create('operating_scanners', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('division_id')->nullable()->constrained();
            $table->string('scanner', 30);
            $table->string('name', 50);
            $table->string('tool_size', 10);
            $table->string('brand', 30);
            $table->string('type', 20);
            $table->string('serial_number', 30);
            $table->string('singgle_dual_view', 10);
            $table->string('year_of_aquisition', 4);
            $table->string('condition', 50);
            $table->string('placement_location', 50);
            $table->string('operating_hours', 50);
            $table->string('scan_hours', 10);
            $table->smallInteger('number_of_scans');
            $table->string('output');
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
        Schema::dropIfExists('operating_scanners');
    }
};
