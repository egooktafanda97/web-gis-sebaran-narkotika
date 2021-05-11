<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pelapor extends Model
{
    use HasFactory;
    protected $table = 'pelapors';
    protected $fillable = [
        "kode",
        "nik",
        "nama",
        "jekel",
        "alamat",
        "email",
        "no_hp",
        "hubungan",
        "tempat_lapor",
        "nilai",
        "atas_nama",
        "alamat_terduga",
        "kecamatan",
        "desa",
        "taggal",
        "pukul",
        "jenis_narkotika",
        "keterangan_tambahan",
        "pendapat",
        "keputusan",
        "status",
        "msg"

    ];
}
