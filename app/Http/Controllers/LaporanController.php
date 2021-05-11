<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade;

class LaporanController extends Controller
{
    public function printTersangka($search = null)
    {
        $get = DB::table('tersangka')
            ->select(DB::raw('*,tersangka.nama as nama,kecamatan.nama as nama_kec, kelurahan.nama as nama_desa'))
            ->join('kecamatan', function ($join) {
                $join->on('kecamatan.id_kec', '=', 'tersangka.kecamatan');
            })
            ->join('kelurahan', function ($join) {
                $join->on('kelurahan.id_kel', '=', 'tersangka.desa');
            })
            ->where('tersangka.nama', 'like', '%' . $search . '%')
            ->orWhere('kecamatan.nama', 'like', '%' . $search . '%')
            ->orWhere('kelurahan.nama', 'like', '%' . $search . '%')
            ->orwhereYear('created_at', 'like', '%' . $search . '%')
            ->get();
        $pdf = Facade::loadview('LaporanTersangka', ["data" => $get])->setPaper('A4', 'landscape');

        return $pdf->stream();
    }
    public function printLapor($cari = null)
    {
        $get =  DB::table('pelapors')
            ->select(DB::raw('*,pelapors.nama as nama,kecamatan.nama as nama_kec, kelurahan.nama as nama_desa'))
            ->join('kecamatan', function ($join) {
                $join->on('kecamatan.id_kec', '=', 'pelapors.kecamatan');
            })
            ->join(
                'kelurahan',
                function ($join) {
                    $join->on('kelurahan.id_kel', '=', 'pelapors.desa');
                }
            )
            ->where('status', 2)
            ->where(function ($query) use ($cari) {
                $query->Where('pelapors.nama', 'like', '%' . $cari . '%');
                $query->orWhere('pelapors.atas_nama', 'like', '%' . $cari . '%');
                $query->orWhere('pelapors.jenis_narkotika', 'like', '%' . $cari . '%');
                $query->orWhere('kecamatan.nama', 'like', '%' . $cari . '%');
                $query->orWhere('kelurahan.nama', 'like', '%' . $cari . '%');
                $query->orwhereYear('created_at', 'like', '%' . $cari . '%');
                $query->orderBy('created_at', 'desc');
            })
            ->get();
        $pdf = Facade::loadview('LaporanPeapor', ["data" => $get])->setPaper('A4', 'landscape');

        return $pdf->stream();
    }
}
