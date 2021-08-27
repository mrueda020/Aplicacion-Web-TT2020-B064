<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

use JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;


class ControladorEvaluador extends Controller
{
    //
    public function Login(Request $request)
    {
       
       try {
           //code...
            $email = $request["email"];
            $contraseña = $request["password"];
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) 
            {
                $response = ['error' => 'Email invalido'];
                return response()->json($response,400);
            }
            $usuario = DB::table('Evaluador')->where('Email', $email)->first();
            if($usuario && $usuario->Email == $email)
            {  
                if(!Hash::check($contraseña, $usuario->Password))
                {
                    $response = ['error' => "Las contraseñas no coinciden"];
                    return response()->json($response,400);
                }
                //    Access token
                $data = ['sub'=>[
                    'email' => $usuario->Email,
                    'id' => $usuario->idEvaluador,
                    'rol' => 'evaluador'
                ]];
                JWTAuth::factory()->setTTL(180);
                $customClaims = JWTFactory::customClaims($data);
                $payload = JWTFactory::make($data);
                $accessToken = JWTAuth::encode($payload);
                //   Refresh Token
                $data = ['sub'=>[
                    'id' => $usuario->idEvaluador,
                    'rol' => 'evaluador'
                ]];
                JWTAuth::factory()->setTTL(43200);
                $customClaims = JWTFactory::customClaims($data);
                $payload = JWTFactory::make($data);
                $refreshToken = JWTAuth::encode($payload);
                $response = ['accessToken' => $accessToken->get() ,
                                'refreshToken' =>$refreshToken->get()
                            ];
                return response()->json($response,200);
            }
            $response = ['error' => "No existe el usuario"];
            return response()->json($response,400);
       } catch (\Throwable $th) {
           //throw $th;
           $response = ['error' => "Error en el servidor"];
            return response()->json($response, 500);
       }
       
    }

    public function agregarPregunta(Request $request)
    {
        try {
            $size = count($request->all());
            $idEvaluador = $request["idEvaluador"];
            $pregunta = $request["pregunta"];
            $area = $request["area"];
            $respuestaCorrecta = $request["respuestaCorrecta"];
            DB::insert('insert into pregunta (Pregunta,Evaluador_idEvaluador_Creador) values (?,?)', [$pregunta,$idEvaluador]);
            $idPregunta = DB::getPdo()->lastInsertId();
            for($i=0; $i<$size-3; $i++)
            {   
                if("respuesta".($i) == $respuestaCorrecta)
                {
                    DB::insert('insert into respuesta (Respuesta, esCorrecta, Pregunta_idPregunta) values (?,?,?)',[$request["respuesta".($i)],1,$idPregunta]); 
                }
                else
                {
                    DB::insert('insert into respuesta (Respuesta, esCorrecta, Pregunta_idPregunta) values (?,?,?)',[$request["respuesta".($i)],0,$idPregunta]);  
                }
            }
            $response = ["message" => "Pregunta agregada"];
            return response()->json($response,201);  
        } catch (\Throwable $th) {
            $response = ["error" => "Error en el servidor"];
            return response()->json($response,500);
        }
       
    }

    public function eliminarPregunta($idEvaluador,$idPregunta)
    {
        try {
            $preguntaEliminada = DB::delete('delete from pregunta where idPregunta = ? and Evaluador_idEvaluador_Creador = ? ',[$idPregunta, $idEvaluador]);
            if($preguntaEliminada)
            {
                $response = ["message" => "Pregunta eliminada"];
                return response()->json($response,200);
            }
            else
            {
                $response = ["error" => "No existe la pregunta"];
                return response()->json($response,404);
            }

        } catch (\Throwable $th) {
            //throw $th;
            $response = ["error" => $th];
            return response()->json($response,500);
        }
    }

    public function obtenerPreguntas($id)
    {
        try {
           $preguntas = DB::table('pregunta')->where('Evaluador_idEvaluador_Creador',$id)->get();
           if(count($preguntas))
           {
                $response = ["data" => $preguntas];
                return response()->json($response,200);
           }
           else
           {
                $response = ["error" => "No hay preguntas"];
                return response()->json($response,404);
           }
           
        } catch (\Throwable $th) {
            $response = ["error" => "Error en el servidor"];
            return response()->json($response,500);
        }
    }  

    public function cargarPreguntas()
    {
        try {
            $preguntas = DB::select("select idPregunta, Pregunta from pregunta");
            if($preguntas)
            {
                $response = ["data" => $preguntas];
                return response()->json($response, 200);
            }
            else
            {
                $response = ["message" => "No hay preguntas"];
                return response()->json($response, 404);
            }

        } catch (\Throwable $th) {
            //throw $th;
            $response = ["error" => "Error en el servidor"];
            return response()->json($response, 500);
        }
    }
}
