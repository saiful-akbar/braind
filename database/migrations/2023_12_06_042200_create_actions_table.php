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
        Schema::create('actions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained();
            $table->foreignUuid('division_id')->nullable()->constrained();
            $table->string('kppbc');
            $table->string('sbp_number');
            $table->date('sbp_date');
            $table->string('comodity_code');
            $table->double('amount');
            $table->text('description');
            $table->double('estimated_item_value');
            $table->double('underpayment_potential');
            $table->string('follow_up');
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
        Schema::dropIfExists('actions');
    }
};
