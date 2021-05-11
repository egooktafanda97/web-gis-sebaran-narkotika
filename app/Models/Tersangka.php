<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tersangka extends Model
{
    use HasFactory;
    protected $table = 'tersangka';
    protected $fillable = [
        "kode_pelapor",
        "admin_id",
        "nama",
        "tempat_lahir",
        "tanggal_lahir",
        "agama",
        "pekerjaan",
        "status",
        "pendidikan",
        "kewarganegaraan",
        "alamat",
        "kecamatan",
        "desa",
        "surat_perintah_penyidik",
        "scan_surat_perintah_penyidik",
        "surat_perintah_penahanan",
        "scan_surat_perintah_penahanan",
        "jenis_narkotika",
        "tgl_penahanan",
        "keterangan"
    ];
}
