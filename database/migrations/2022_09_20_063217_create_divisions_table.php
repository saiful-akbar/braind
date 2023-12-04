<?php

use App\Helpers\Slug;
use App\Models\Division;
use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateDivisionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('divisions', function (Blueprint $table) {
            $table->integerIncrements('id');
            $table->string('name', 40);
            $table->string('slug', 40);
            $table->softDeletes();
            $table->timestamps();
        });

        $divisions = [
            ['name' => 'Ngurah Rai'],
            ['name' => 'Denpasar'],
            ['name' => 'Mataram'],
            ['name' => 'Sumbawa'],
            ['name' => 'Kupang'],
            ['name' => 'Labuan Bajo'],
            ['name' => 'Atambua'],
        ];

        foreach ($divisions as $divisi) {
            $divisi['slug'] = Slug::make(new Division(), $divisi['name']);
            $divisi['created_at'] = Carbon::now();
            $divisi['updated_at'] = Carbon::now();
            DB::table('divisions')->insert($divisi);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('divisions');
    }
}
