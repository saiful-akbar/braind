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
        Schema::create('cukai_ht_hptl_companies', function (Blueprint $table) {
            $table->id();
            $table->string('nppbkc');
            $table->double('tax_amount');
            $table->double('amount');
            $table->string('bkc_type', 100);
            $table->double('ck_amount');
            $table->double('amount_of_excise_duty');
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
        Schema::dropIfExists('cukai_ht_hptl_companies');
    }
};
