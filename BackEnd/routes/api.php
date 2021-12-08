<?php
use App\Http\Controllers\ControladorEvaluado;
use App\Http\Controllers\ControladorEvaluador;
use App\Http\Controllers\ControladorAdmin;
use App\Http\Controllers\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\VerificarTokenEvaluado;
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
Route::get("/cargar-grupos/{idEvaluado}",[ControladorEvaluado::class,"cargarGrupos"])->middleware(VerificarTokenEvaluado::class);
Route::get("/cargar-examanes/{idEvaluado}/{idGrupo}",[ControladorEvaluado::class,"cargarExamens"])->middleware(VerificarTokenEvaluado::class);
Route::get("/cargar-examen/{idEvaluado}/{idExamen}/{idGrupo}",[ControladorEvaluado::class,"cargarExamen"])->middleware(VerificarTokenEvaluado::class);
Route::post("/enviar-respuestas",[ControladorEvaluado::class,"enviarRespuestas"])->middleware(VerificarTokenEvaluado::class);
Route::get("/resultados/{idEvaluado}",[ControladorEvaluado::class,"obtenerResultados"])->middleware(VerificarTokenEvaluado::class);
Route::post("/actualizar-info/{idEvaluado}",[ControladorEvaluado::class,"actualizarInfo"])->middleware(VerificarTokenEvaluado::class);
Route::post("/enviar-respuestasM",[ControladorEvaluado::class,"enviarRespuestasMovil"])->middleware(VerificarTokenEvaluado::class);

//Rutas para Evaluador
// Route::post("/login-evaluador", [ControladorEvaluador::class,"Login"]);
Route::post("/agregar-pregunta",[ControladorEvaluador::class,"agregarPregunta"])->middleware(VerificarToken::class);
Route::get("/preguntas/{id}",[ControladorEvaluador::class,"obtenerPreguntas"])->middleware(VerificarToken::class);
Route::delete("/eliminar-pregunta/{idEvaluador}/{idPregunta}",[ControladorEvaluador::class,"eliminarPregunta"])->middleware(VerificarToken::class);
Route::get("/cargar-preguntas",[ControladorEvaluador::class,"cargarPreguntas"])->middleware(VerificarToken::class);
Route::post("/crear-examen",[ControladorEvaluador::class,"crearExamen"])->middleware(VerificarToken::class);
Route::get("/obtener-evaluados",[ControladorEvaluador::class,"obtenerEvaluados"])->middleware(VerificarToken::class);
Route::post("/crear-grupo",[ControladorEvaluador::class,"crearGrupo"])->middleware(VerificarToken::class);
Route::get("/obtener-examenes",[ControladorEvaluador::class,"obtenerExamenes"])->middleware(VerificarToken::class);
Route::get("/grupos/{idEvaluador}",[ControladorEvaluador::class,"obtenerGrupos"])->middleware(VerificarToken::class);
Route::post("/asignar-examen",[ControladorEvaluador::class,"asignarExamenes"])->middleware(VerificarToken::class);
Route::post("/actualizar-info-evaluador/{idEvaluador}",[ControladorEvaluador::class,"actualizarInfo"])->middleware(VerificarToken::class);
Route::get("/obtener-examenes/{idEvaluador}",[ControladorEvaluador::class,"obtenerExamenesEvaluador"])->middleware(VerificarToken::class);
Route::delete("/eliminar-examen/{idEvaluador}/{idExamen}",[ControladorEvaluador::class,"eliminarExamen"])->middleware(VerificarToken::class);
Route::delete("/eliminar-grupo/{idEvaluador}/{idGrupo}",[ControladorEvaluador::class,"eliminarGrupo"])->middleware(VerificarToken::class);
Route::get("/resultados-evaluador/{idEvaluador}",[ControladorEvaluador::class,"obtenerResultados"])->middleware(VerificarToken::class);

//Rutas para Admin
Route::post("/login-administrador",[ControladorAdmin::class,"Login"]);
Route::post("/registro-administrador",[ControladorAdmin::class,"Registro"]);
Route::post("/registrar-evaluador",[ControladorAdmin::class,"registrarEvaluador"]);

//Rutas para Auth
Route::post("/refrescar-token",[Auth::class,"refrescarToken"]);
Route::post("/login",[Auth::class, "Login"]);