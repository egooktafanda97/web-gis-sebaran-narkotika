<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTersangkasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tersangka', function (Blueprint $table) {
            $table->id();
            $table->integer('admin_id')->nullable();
            $table->string('nama', 100);
            $table->string('tempat_lahir', 20);
            $table->date('tanggal_lahir');
            $table->string('agama', 20);
            $table->string('pekerjaan', 50);
            $table->string('status', 15);
            $table->string('pendidikan', 30);
            $table->string('kewarganegaraan', 30);
            $table->text('alamat');
            $table->string('surat_perintah_penyidik', 50);
            $table->string('scan_surat_perintah_penyidik', 100)->nullable();
            $table->string('surat_perintah_penahanan', 50);
            $table->string('scan_surat_perintah_penahanan', 100)->nullable();
            $table->string('jenis_narkotika', 50);
            $table->date('tgl_penahanan');
            $table->text('keterangan')->nullable();
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
        Schema::dropIfExists('tersangka');
    }
}
