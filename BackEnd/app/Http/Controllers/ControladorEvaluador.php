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
       $usuario = DB::table('evaluador')->where('Email', $email)->first();
       if($usuario && $usuario->Email == $email)
       {  
           if(!Hash::check($contraseña, $usuario->Password))
           {
               $response = ['error' => "Las contraseñas no coinciden"];
               return response()->json($response,400);
           }
           $data = ['sub'=>[
               'email' => $usuario->Email,
               'id' => $usuario->idEvaluador,
               'rol' => 'evaluador'
           ]];
           $customClaims = JWTFactory::customClaims($data);
           $payload = JWTFactory::make($data);
           $token = JWTAuth::encode($payload);
           $response = ['accessToken' => $token->get()];
           return response()->json($response,200);
       }
       $response = ['error' => "No existe el usuario"];
       return response()->json($response,400);
       
    }

    public function agregarPregunta(Request $resquest)
    {
        print("Aqui va la logica de agregar pregunta");     
    }
   


}
