<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tersangka;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use \Illuminate\Support\Str;
use Mockery\Undefined;

class TersangkaController extends Controller
{
    public function tersangka(Request $request)
    {
        $post = $request->all();
        unset($post['case']);
        unset($post['scan_surat_perintah_penahanan']);
        unset($post['scan_surat_perintah_penyidik']);
        unset($post['id']);

        switch ($request->case) {
            case 'insert':
                $validator = Validator::make($request->all(), [
                    "nama"  => 'required|unique:tersangka',
                ]);
                if ($validator->fails()) {
                    return response()->json(["status" => 500, "msg" => "Duplicat entry"]);
                }
                $upFoto = $this->Upgambar($request, 'foto', '/img/tersangka');
                $upScanpenahanan = $this->Upgambar($request, 'scan_surat_perintah_penahanan', '/img/surat');
                $upScanpenyidik  = $this->Upgambar($request, 'scan_surat_perintah_penyidik', '/img/surat');
                if ($upFoto['status']) {

                    $post = $post + ["foto" => $upFoto['fileName']];
                }
                if ($upScanpenahanan['status']) {
                    $post = $post + ["scan_surat_perintah_penahanan" => $upScanpenahanan['fileName']];
                }
                if ($upScanpenyidik['status']) {
                    $post = $post + ["scan_surat_perintah_penyidik" => $upScanpenyidik['fileName']];
                }
                return $this->insert($post);
                break;

            case 'update':
                $validator = Validator::make($request->all(), [
                    "nama"  => 'required',
                ]);
                if ($validator->fails()) {
                    return response()->json(["status" => 500, "msg" => "need entry nama"]);
                }
                $upFoto = $this->Upgambar($request, 'foto', '/img/tersangka');
                $upScanpenahanan = $this->Upgambar($request, 'scan_surat_perintah_penahanan', '/img/surat');
                $upScanpenyidik  = $this->Upgambar($request, 'scan_surat_perintah_penyidik', '/img/surat');
                if ($upFoto['status']) {

                    $post = $post + ["foto" => $upFoto['fileName']];
                }
                if ($upScanpenahanan['status']) {
                    $post = $post + ["scan_surat_perintah_penahanan" => $upScanpenahanan['fileName']];
                }
                if ($upScanpenyidik['status']) {
                    $post = $post + ["scan_surat_perintah_penyidik" => $upScanpenyidik['fileName']];
                }
                return $this->update($post, $request->id);
                break;
            case 'delete':
                try {
                    $exe = Tersangka::whereid($request->id)->delete();
                    if ($exe) {
                        return response()->json(["status" => 200, "msg" => "aksi berhasil"]);
                    } else {
                        return response()->json(["status" => 409, "msg" => "aksi gagal pada database"]);
                    }
                } catch (\GuzzleHttp\Exception\ClientException $e) {
                    return response()->json(["status" => 500, "msg" => "gagal kesalahan query"]);
                }
                break;
            default:
                $cari = $request->cari;
                // if (!empty($request->cari) || $request->cari != 'Undefined' || $request->cari != null) {
                // }
                $get = DB::table('tersangka')
                    ->select(DB::raw('*,tersangka.nama as nama,kecamatan.nama as nama_kec, kelurahan.nama as nama_desa'))
                    ->join('kecamatan', function ($join) {
                        $join->on('kecamatan.id_kec', '=', 'tersangka.kecamatan');
                    })
                    ->join('kelurahan', function ($join) {
                        $join->on('kelurahan.id_kel', '=', 'tersangka.desa');
                    })
                    ->where('tersangka.nama', 'like', '%' . $cari . '%')
                    ->orWhere('kecamatan.nama', 'like', '%' . $cari . '%')
                    ->orWhere('kelurahan.nama', 'like', '%' . $cari . '%')
                    ->orwhereYear('created_at', 'like', '%' . $cari . '%')
                    ->get();
                return response()->json($get);
                break;
        }
    }
    public function insert($data)
    {
        try {
            $model = new Tersangka($data);
            $exe = $model->save();
            if ($exe) {
                return response()->json(["status" => 200, "msg" => "aksi berhasil"]);
            } else {
                return response()->json(["status" => 409, "msg" => "aksi gagal pada database"]);
            }
        } catch (\GuzzleHttp\Exception\ClientException $e) {
            return response()->json(["status" => 500, "msg" => "gagal kesalahan query"]);
        }
    }

    public function update($data, $id)
    {
        try {
            $model = Tersangka::class;
            $exe = $model::whereid($id)->update($data);
            if ($exe) {
                return response()->json(["status" => 200, "msg" => "aksi berhasil"]);
            } else {
                return response()->json(["status" => 409, "msg" => "aksi gagal pada database"]);
            }
        } catch (\GuzzleHttp\Exception\ClientException $e) {
            return response()->json(["status" => 500, "msg" => "gagal kesalahan query"]);
        }
    }


    public function Upgambar($request, $nameFile, $path)
    {
        if ($request->hasFile($nameFile)) {
            $validator = Validator::make($request->all(), [
                $nameFile         => 'required|image|mimes:jpeg,png,jpg,gif,svg',
            ]);
            if ($validator->fails()) {
                return response()->json(["status" => false, "msg" => "tidak valid"]);
            }

            $image = $request->file($nameFile);
            $image_name = Str::random() . time() . '.' . $image->getClientOriginalExtension();
            $destinationPath = public_path($path);
            $image->move($destinationPath, $image_name);
            return ["status" => true, "msg" => "berhasil upload gambar", "fileName" => $image_name];
        } else {
            return ["status" => false, "msg" => "tidak ada gambar"];
        }
    }

    public function jmlKasus(Request $request)
    {
        $res = Tersangka::where('kecamatan', $request->id_kec)->get()->count();
        return response()->json($res);
    }
    public function jmlKasus_per_thn($id_kec)
    {
        $start = date('Y') - 5;
        $end = date('Y');
        $result = [];
        for ($i = $start; $i <= $end; $i++) {
            $res = Tersangka::whereYear('created_at', '=', $i)->where('kecamatan', $id_kec)->get()->count();
            $kec = \App\Models\Kecamatan::whereid_kec($id_kec)->first();
            array_push($result, ["tahun" => $i, "jumlah" => $res, "kecamatan" => $kec->nama]);
        }

        return response()->json($result);
    }
    public function getJumlahPengguna()
    {
        $modelKecamatan = \App\Models\Kecamatan::all();
        $result = [];
        foreach ($modelKecamatan as $val) {
            $res = Tersangka::where('kecamatan', '=', $val->id_kec)->get()->count();
            array_push($result, ["kecamatan" => $val->nama, "jumlah" => $res]);
        }
        return response()->json($result);
    }
    public function tersangkaById($id)
    {
        $get = DB::table('tersangka')
            ->select(DB::raw('*,tersangka.nama as nama,kecamatan.nama as nama_kec, kelurahan.nama as nama_desa'))
            ->join('kecamatan', function ($join) {
                $join->on('kecamatan.id_kec', '=', 'tersangka.kecamatan');
            })
            ->join('kelurahan', function ($join) {
                $join->on('kelurahan.id_kel', '=', 'tersangka.desa');
            })
            ->where('id', $id)->first();
        return response()->json($get);
    }
    public function getAllKasus()
    {
        try {
            $start = date('Y') - 5;
            $end = date('Y');
            $result = [];
            $__tahun = [];
            $kecamatan = \App\Models\Kecamatan::all();
            foreach ($kecamatan as $valKec) {
                $data_Pkec = [];
                $tahun = [];
                for ($i = $start; $i <= $end; $i++) {
                    $res = Tersangka::whereYear('created_at', '=', $i)->where('kecamatan', $valKec->id_kec)->get()->count();
                    array_push($data_Pkec, [$res]);
                }
                array_push($result, ["is_kec" => $valKec->id_kec, "kecamatan" => $valKec->nama, "jumlah" => $data_Pkec]);
            }

            for ($i__ = $start; $i__ <= $end; $i__++) {
                array_push($__tahun, $i__);
            }
            return response()->json(["status" => 200, "reponse" => $result, "tahun" => $__tahun]);
        } catch (\GuzzleHttp\Exception\ClientException $e) {
            return response()->json(["status" => 500, "msg" => "gagal kesalahan query"]);
        }
    }

}
