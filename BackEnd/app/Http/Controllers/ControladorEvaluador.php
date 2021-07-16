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
       
    }

    public function agregarPregunta(Request $request)
    {
        $idEvaluador = $request["idEvaluador"];
        $pregunta = $request["pregunta"];
        $area = $request["area"];
        $respuestaCorrecta = $request["respuestaCorrecta"];

        DB::insert('insert into pregunta (Pregunta,Evaluador_idEvaluador_Creador) values (?,?)', [$pregunta,$idEvaluador]);
        $idPregunta = DB::getPdo()->lastInsertId();
        $idRespuestas = [];
        for($i=0; $i<4; $i++)
        {   
            if($request["respuesta".($i+1)]==$respuestaCorrecta)
            {
                DB::insert('insert into respuesta (Respuesta, esCorrecta) values (?,?)',[$request["respuesta".($i+1)],1]);
                $idRespuestas[$i] = DB::getPdo()->lastInsertId();
            }
            else
            {
                DB::insert('insert into respuesta (Respuesta, esCorrecta) values (?,?)',[$request["respuesta".($i+1)],0]);
                $idRespuestas[$i] = DB::getPdo()->lastInsertId();
            }
        }

        for($i=0; $i<4; $i++)
        {
            DB::insert('insert into respuestas_en_preguntas (Pregunta_idPregunta, Respuesta_idRespuesta) values (?, ?)', [$idPregunta, $idRespuestas[$i]]);
        }
       
        
    }
   


}
