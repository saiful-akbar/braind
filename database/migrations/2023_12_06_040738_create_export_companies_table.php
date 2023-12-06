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
        Schema::create('export_companies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('division_id')->nullable()->constrained();
            $table->string('name', 50);
            $table->string('tax_number', 20);
            $table->double('peb');
            $table->double('bruto');
            $table->double('devisa');
            $table->double('export_duty');
            $table->double('netto');
            $table->double('number_of_liters')->nullable();
            $table->double('number_of_excise_duty')->nullable();
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
        Schema::dropIfExists('export_companies');
    }
};
