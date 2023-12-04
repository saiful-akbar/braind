<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->enum('sex', ['l', 'p'])->nullable();
            $table->string('place_of_birth', 50)->nullable();
            $table->date('birth_date')->nullable();
            $table->string('phone', 15)->nullable();
            $table->string('role', 6)->default('kanwil');
            $table->string('instagram', 30)->nullable();
            $table->string('avatar')->nullable();
            $table->dateTime('deleted_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
