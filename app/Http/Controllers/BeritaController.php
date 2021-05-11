<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use \Illuminate\Support\Str;
use App\Models\Berita;

class BeritaController extends Controller
{
    public function news(Request $request)
    {
        $post = $request->all();
        unset($post['case']);
        unset($post['thumbnail']);
        unset($post['id']);

        switch ($request->case) {
            case 'insert':
                $validator = Validator::make($request->all(), [
                    "title"  => 'required',
                ]);
                if ($validator->fails()) {
                    return response()->json(["status" => 500, "msg" => "title tidak beleh kosong"]);
                }

                $thm = $this->Upgambar($request, 'thumbnail', '/img/Berita');
                if ($thm['status']) {
                    $post = $post + ["thumbnail" => $thm['fileName']];
                }

                $post = $post + ["status" => 0, "view" => 0];

                return $this->insert($post);
                break;

            case 'update':
                $validator = Validator::make($request->all(), [
                    "title"  => 'required',
                ]);
                if ($validator->fails()) {
                    return response()->json(["status" => 500, "msg" => "title tidak beleh kosong"]);
                }

                $thm = $this->Upgambar($request, 'thumbnail', '/img/Berita');
                if ($thm['status']) {
                    $post = $post + ["thumbnail" => $thm['fileName']];
                } else {
                    unset($post["thumbnail"]);
                }

                $post = $post + ["status" => 0];

                return $this->update($post, $request->id);
                break;
            case 'delete':
                try {
                    $exe = Berita::whereid($request->id)->delete();
                    if ($exe) {
                        return response()->json(["status" => 200, "msg" => "aksi berhasil"]);
                    } else {
                        return response()->json(["status" => 409, "msg" => "aksi gagal pada database"]);
                    }
                } catch (\GuzzleHttp\Exception\ClientException $e) {
                    return response()->json(["status" => 500, "msg" => "gagal kesalahan query"]);
                }
                break;
                break;
            default:
                return response()->json(Berita::all());
                break;
        }
    }
    public function update($data, $id)
    {
        try {

            $exe = Berita::whereid($id)->update($data);
            if ($exe) {
                return response()->json(["status" => 200, "msg" => "aksi berhasil"]);
            } else {
                return response()->json(["status" => 409, "msg" => "aksi gagal pada database"]);
            }
        } catch (\GuzzleHttp\Exception\ClientException $e) {
            return response()->json(["status" => 500, "msg" => "gagal kesalahan query"]);
        }
    }
    public function insert($data)
    {
        try {
            $model = new Berita($data);
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
    public function allBerita($id)
    {

        $get = Berita::whereid($id)->first();
        Berita::whereid($id)->update(["view" => $get->view + 1]);

        return response()->json($get);
    }
}
