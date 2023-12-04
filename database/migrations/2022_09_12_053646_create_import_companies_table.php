<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateImportCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('import_companies', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->string('pib', 30);
            $table->float('total_pay', 11, 2);
            $table->float('income_duty', 11, 2);
            $table->bigInteger('user_id')->unsigned();
            $table->date('input_date');
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('import_companies');
    }
}
