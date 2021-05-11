<?php

// use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/testing', [\App\Http\Controllers\TestController::class, 'index']);
Route::get('tersangka-print/{slug?}', [\App\Http\Controllers\LaporanController::class, 'printTersangka']);
Route::get('laporan-pelapor/{slug?}', [\App\Http\Controllers\LaporanController::class, 'printLapor']);

Auth::routes();

// ////////////////////////////////////////////////////////////////////////////////////////
// Route::get("email", [\App\Http\Controllers\MailerController::class, "email"])->name("email");

// Route::post("send-email", [\App\Http\Controllers\MailerController::class, "composeEmail"])->name("send-email");
// //////////////////////////////////////////////////////////////////////////////////////

Route::get('/', function () {

    return view('index');
});
Route::get('/Home', function () {

    return view('index');
});
Route::get('/Sebaran', function () {

    return view('index');
});
Route::get('/Pelaporan', function () {

    return view('index');
});
Route::get('/Pelaporan/{slug?}', function () {

    return view('index');
});
Route::get('/Finish/{slug?}', function () {

    return view('index');
});
Route::get('/Berita', function () {

    return view('index');
});
Route::get('/Berita/{slug}', function () {

    return view('index');
});

Route::get('/profile', function () {

    return view('index');
});

Route::get('/logout', function () {
    Auth::logout();
    return redirect('/');
});

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/{slug?}', [App\Http\Controllers\AdminController::class, 'index']);
Route::get('/{slug?}/{id?}', [App\Http\Controllers\AdminController::class, 'index']);




// reactJs


// ------
