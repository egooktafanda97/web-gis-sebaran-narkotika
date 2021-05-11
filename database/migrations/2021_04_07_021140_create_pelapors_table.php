<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePelaporsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pelapors', function (Blueprint $table) {
            $table->id();
            $table->string('nik', 20);
            $table->string('nama', 80);
            $table->string('jekel', 20);
            $table->string('alamat', 100);
            $table->string('atas_nama', 100);
            $table->string('alamat_terduga', 100);
            $table->integer('kecamatan');
            $table->integer('desa');
            $table->date('taggal');
            $table->time('pukul');
            $table->string('jenis_narkotika', 30);
            $table->longText('keterangan_tambahan');
            $table->longText('pendapat');
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
        Schema::dropIfExists('pelapors');
    }
}
