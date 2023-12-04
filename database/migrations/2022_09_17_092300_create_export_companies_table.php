<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExportCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('export_companies', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->string('peb', 30);
            $table->float('devisa', 11, 2);
            $table->float('export_duty', 11, 2);
            $table->float('netto', 11, 2);
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
        Schema::dropIfExists('export_companies');
    }
}
