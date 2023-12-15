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
        Schema::create('operating_telecomunication_tools', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained();
            $table->foreignUuid('division_id')->nullable()->constrained();
            $table->string('name');
            $table->string('code', 20);
            $table->string('nup', 20);
            $table->string('device_type', 30);
            $table->double('acquisition_cost');
            $table->string('year_of_acquisition', 4);
            $table->string('brand', 50);
            $table->string('type', 50);
            $table->string('frequency_range', 20);
            $table->string('digital_technology', 30);
            $table->string('condition', 20);
            $table->string('status', 30);
            $table->string('placement_location', 50);
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
        Schema::dropIfExists('operating_telecomunication_tools');
    }
};
