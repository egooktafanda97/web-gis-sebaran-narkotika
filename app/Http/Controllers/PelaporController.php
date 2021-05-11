<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Pelapor;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\MailerController;

class PelaporController extends Controller
{
    public function pelaporan(Request $request)
    {
        $post = $request->all();
        unset($post['case']);
        unset($post['id']);
        unset($post['seendEmail']);
        switch ($request->case) { 
            case 'insert':
                $validator = Validator::make($request->all(), [
                    "nama"  => 'required',
                    "email"  => 'required',
                    "atas_nama"  => 'required|unique:pelapors',
                ]);
                if ($validator->fails()) {
                    return response()->json(["status" => 500, "msg" => "Duplicat entry"]);
                }
                $post = $post + ["kode" => generateRandomString(), "status" => 0, "msg" => 0];
                return $this->insert($post);
                break;

            case 'update':
                if (empty($post['status'])) {
                    $post = $post + ["status" => 0, "msg" => 0];
                }
                if ($request->seendEmail == true) {
                    $getDataPel = Pelapor::whereid($request->id)->first();
                    $seend = new MailerController();
                    $seendEmail =  $seend->composeEmail($getDataPel->email, 'Pelaporan Penyalah Gunaan Narkotika', 'laporan anda dapat di lihat di <a href="' . url('pelporanEmail/' . $request->id) . '"');
                    if ($seendEmail == true) {
                        return $this->update($post, $request->id);
                    }
                }
                return $this->update($post, $request->id);

                break;
            case 'delete':
                try {
                    $exe = Pelapor::whereid($request->id)->delete();
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

                break;
        }
    }
    public function insert($data)
    {
        try {
            $model = Pelapor::create($data);
            return response()->json(["status" => 200, "msg" => "aksi berhasil", "data" => $model->id]);
        } catch (\GuzzleHttp\Exception\ClientException $e) {
            return response()->json(["status" => 500, "msg" => "gagal kesalahan query"]);
        }
    }
    public function update($data, $id)
    {
        // return response()->json(["status" => 200, "msg" => "aksi berhasil", "data" => $id]);
        try {
            Pelapor::whereid($id)->update($data);
            return response()->json(["status" => 200, "msg" => "aksi berhasil", "data" => $id]);
        } catch (\GuzzleHttp\Exception\ClientException $e) {
            return response()->json(["status" => 500, "msg" => "gagal kesalahan query"]);
        }
    }

    public function getDataById(Request $req)
    {
        $get = DB::table('pelapors')
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
            ->where(["id" => $req->id, "status" => 0])->first();
        return response()->json($get);
    }
    public function getAllData($cases = 1, $cari = null)
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
            ->where('status', $cases)
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
        return response()->json($get);
    }
    public function updateOpenMsg(Request $request)
    {
        $res = \App\Models\Pelapor::whereid($request->id)->first();
        if ($res->msg == 0) {
            \App\Models\Pelapor::whereid($request->id)->update(["msg" => 1]);
        }
        return response()->json(["status" => 200, "msg" => "aksi berhasil"]);
    }
    public function updateStatus(Request $request)
    {
        $res = \App\Models\Pelapor::whereid($request->id)->first();
        if (!empty($request->pesan)) {
            $getDataPel = Pelapor::whereid($request->id)->first();
            $seend = new MailerController();
            $seendEmail =  $seend->composeEmail($res->email, 'Pesan Response Laporan Anda', $request->pesan);
        }
        \App\Models\Pelapor::whereid($request->id)->update(["status" => $request->status, "keputusan" => $request->pesan]);
        return response()->json(["status" => 200, "msg" => "aksi berhasil"]);
    }
}
