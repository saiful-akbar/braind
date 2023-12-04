<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('actions', function (Blueprint $table) {
            $table->id();
            $table->string('kppbc');
            $table->integer('division_id')->unsigned();
            $table->bigInteger('user_id')->unsigned();
            $table->string('sbp_number');
            $table->date('sbp_date');
            $table->string('comodity_code');
            $table->float('amount', 11, 2);
            $table->text('description');
            $table->float('estimated_item_value', 11, 2);
            $table->float('underpayment_potential', 11, 2);
            $table->string('follow_up');
            $table->softDeletes();
            $table->dateTime('input_date');
            $table->timestamps();

            $table->foreign('division_id')->references('id')->on('divisions');
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
        Schema::dropIfExists('actions');
    }
}
