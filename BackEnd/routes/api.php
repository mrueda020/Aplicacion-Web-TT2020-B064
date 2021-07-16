<?php
use App\Http\Controllers\ControladorEvaluado;
use App\Http\Controllers\ControladorEvaluador;
use App\Http\Controllers\ControladorAdmin;
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

//Rutas para Evaluado
Route::post("/Registro", [ControladorEvaluado::class,"Registro"]);
Route::post("/Login", [ControladorEvaluado::class,"Login"]);


//Rutas para Evaluador
Route::post("/login-evaluador", [ControladorEvaluador::class,"Login"]);
Route::post("/agregar-pregunta",[ControladorEvaluador::class,"agregarPregunta"])->middleware(VerificarToken::class);;

//Rutas para Admin
Route::post("/login-administrador",[ControladorAdmin::class,"Login"]);
Route::post("/registro-administrador",[ControladorAdmin::class,"Registro"]);
Route::post("/registrar-evaluador",[ControladorAdmin::class,"registrarEvaluador"]);