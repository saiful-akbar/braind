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
        Schema::create('import_companies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('division_id')->nullable()->constrained();
            $table->string('name', 50);
            $table->string('tax_number', 20);
            $table->double('pib');
            $table->double('bm_pay');
            $table->double('netto');
            $table->double('bruto');
            $table->double('total_pay');
            $table->double('income_duty')->nullable();
            $table->double('input_date');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('import_companies');
    }
};
