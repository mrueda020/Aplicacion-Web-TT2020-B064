<?php
use App\Http\Controllers\ControladorEvaluado;
use App\Http\Controllers\ControladorEvaluador;
use App\Http\Controllers\ControladorAdmin;
use App\Http\Controllers\Auth;
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
// Route::post("/Login", [ControladorEvaluado::class,"Login"]);
Route::get("/cargar-grupos/{idEvaluado}",[ControladorEvaluado::class,"cargarGrupos"]);
Route::get("/cargar-examanes/{idEvaluado}/{idGrupo}",[ControladorEvaluado::class,"cargarExamens"]);
Route::get("/cargar-examen/{idEvaluado}/{idExamen}",[ControladorEvaluado::class,"cargarExamen"]);
Route::post("/enviar-respuestas",[ControladorEvaluado::class,"enviarRespuestas"]);
Route::get("/resultados/{idEvaluado}",[ControladorEvaluado::class,"obtenerResultados"]);
Route::post("/actualizar-info/{idEvaluado}",[ControladorEvaluado::class,"actualizarInfo"]);

//Rutas para Evaluador
// Route::post("/login-evaluador", [ControladorEvaluador::class,"Login"]);
Route::post("/agregar-pregunta",[ControladorEvaluador::class,"agregarPregunta"])->middleware(VerificarToken::class);;
Route::get("/preguntas/{id}",[ControladorEvaluador::class,"obtenerPreguntas"]);
Route::delete("/eliminar-pregunta/{idEvaluador}/{idPregunta}",[ControladorEvaluador::class,"eliminarPregunta"]);
Route::get("/cargar-preguntas",[ControladorEvaluador::class,"cargarPreguntas"]);
Route::post("/crear-examen",[ControladorEvaluador::class,"crearExamen"]);
Route::get("/obtener-evaluados",[ControladorEvaluador::class,"obtenerEvaluados"]);
Route::post("/crear-grupo",[ControladorEvaluador::class,"crearGrupo"]);
Route::get("/obtener-examenes",[ControladorEvaluador::class,"obtenerExamenes"]);
Route::get("/grupos/{idEvaluador}",[ControladorEvaluador::class,"obtenerGrupos"]);
Route::post("/asignar-examen",[ControladorEvaluador::class,"asignarExamenes"]);
Route::post("/actualizar-info-evaluador/{idEvaluador}",[ControladorEvaluador::class,"actualizarInfo"]);

//Rutas para Admin
Route::post("/login-administrador",[ControladorAdmin::class,"Login"]);
Route::post("/registro-administrador",[ControladorAdmin::class,"Registro"]);
Route::post("/registrar-evaluador",[ControladorAdmin::class,"registrarEvaluador"]);

//Rutas para Auth
Route::post("/refrescar-token",[Auth::class,"refrescarToken"]);
Route::post("/login",[Auth::class, "Login"]);