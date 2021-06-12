<?php
use App\Http\Controllers\ControladorUsuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Middleware\VerificarToken;
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

Route::post("/Registro", [ControladorUsuario::class,"Registro"]);
Route::post("/Login", [ControladorUsuario::class,"Login"]);
Route::get("/",[ControladorUsuario::class,"obtenerUsuarios"])->middleware(VerificarToken::class);


