<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/getKecamtan', function () {
    return response()->json(\App\Models\Kecamatan::all());
});
Route::post('/getDesa', function (Request $req) {
    $data = \App\Models\Desa::whereidKec($req->id_kec)->get();
    return response()->json($data);
});

Route::post('/tersangka', [
    \App\Http\Controllers\TersangkaController::class, 'tersangka'
]);

Route::get('/tersangkaById/{id?}', [
    \App\Http\Controllers\TersangkaController::class, 'tersangkaById'
]);

Route::post('/getJumlahKaus', [\App\Http\Controllers\TersangkaController::class, 'jmlKasus']);
Route::get('/getJumlahKaus_pertahun/{id}', [\App\Http\Controllers\TersangkaController::class, 'jmlKasus_per_thn']);
Route::get('/getJumlahPengguna', [\App\Http\Controllers\TersangkaController::class, 'getJumlahPengguna']);
Route::post('/News', [\App\Http\Controllers\BeritaController::class, 'news']);

Route::post('/Pelaporan', [\App\Http\Controllers\PelaporController::class, 'pelaporan']);
Route::post('/getPelaporById', [\App\Http\Controllers\PelaporController::class, 'getDataById']);
Route::get('/getPelaporAllData/{slug?}/{cari?}', [\App\Http\Controllers\PelaporController::class, 'getAllData']);
Route::post('/updateOpenMsg', [\App\Http\Controllers\PelaporController::class, 'updateOpenMsg']);
Route::post('/updateStatus', [\App\Http\Controllers\PelaporController::class, 'updateStatus']);

Route::get('/allBerita/{id}', [\App\Http\Controllers\BeritaController::class, 'allBerita']);


// ///////////////////
Route::post("sendEmail", [\App\Http\Controllers\MailerController::class, "composeEmail"]);

Route::get('getAllKasus', [
    \App\Http\Controllers\TersangkaController::class, 'getAllKasus'
]);
