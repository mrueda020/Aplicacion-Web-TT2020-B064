<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

use JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;

class ControladorAdmin extends Controller
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
       $usuario = DB::table('Admin')->where('Ad_email', $email)->first();
       
       if($usuario && $usuario->Ad_email == $email)
       {    
           if(!Hash::check($contraseña, $usuario->Password))
           {    
               $response = ['error' => "Las contraseñas no coinciden"];
               return response()->json($response,400);
           }
        //    Access Token
           $data = ['sub'=>[
               'email' => $usuario->Ad_email,
               'id' => $usuario->Ad_id,
               'rol' => 'admin'
           ]];
           JWTAuth::factory()->setTTL(180);
           $customClaims = JWTFactory::customClaims($data);
           $payload = JWTFactory::make($data);
           $accesToken = JWTAuth::encode($payload);

        //    Refresh Token
           $data = ['sub'=>[
                'id' => $usuario->Ad_id,
                'rol' => 'admin'
           ]];
           JWTAuth::factory()->setTTL(43200);
           $customClaims = JWTFactory::customClaims($data);
           $payload = JWTFactory::make($data);
           $refreshToken = JWTAuth::encode($payload);

           $response = ['accessToken' => $accesToken->get() ,
                        'refreshToken' =>$refreshToken->get()
                    ];
           return response()->json($response,200);
       }
       $response = ['error' => "No existe el usuario"];
       return response()->json($response,400);
    }
   


    public function Registro(Request $request)
    {  
       //Todo verificar que el email no exista en evaluado , evaluador
       $email = $request["email"];
       $contraseña = $request["password"];
       $confirmarContraseña = $request["confirmarPassword"];
       $nombre = $request["nombre"];
       $apPaterno = $request["apPaterno"];
       $apMaterno = $request["apMaterno"];
      
       if (!filter_var($email, FILTER_VALIDATE_EMAIL)) 
       {
          $response = ['error' => 'Email invalido'];
          return response()->json($response,400);
       }
       $usuario = DB::table('admin')->where('Ad_email', $email)->first();
       if($usuario && $usuario->Ad_email)
       {
           $response = ['error' => "Ya existe el email en el sistema"];
           return response()->json($response,400);
       }

       if($confirmarContraseña != $contraseña)
       {
           $response = ['error' => "Las contraseñas no coinciden"];
           return response()->json($response,400);
       }
      
       if(strlen($contraseña) < 8)
       {
           return response()->json(['error'=>'La contraseña debe ser de 8 caracteres minimo'],400);
       }
     
       $contraseña = Hash::make($contraseña);
       
       $response = DB::insert("insert into admin (Ad_nombre,Ad_apellido_paterno,Ad_apellido_materno,Ad_email,Ad_contraseña) values (?,?,?,?,?)",[$nombre,$apPaterno,$apMaterno,$email,$contraseña]);
       if($response == 0)
       {    
           $response = ['error' => "Error en el servidor"];
           return response()->json($response,400);
           
       }
       $response = ['status' => "Usuario creado correctamente"];
      
       return response()->json($response,201);
    }

    public function registrarEvaluador(Request $request)
    {
       //Todo verificar que el email no exista en evaluado , admin 
       $email = $request["email"];
       $contraseña = $request["password"];
       $confirmarContraseña = $request["confirmarPassword"];
       $nombre = $request["nombre"];
       $apPaterno = $request["apPaterno"];
       $apMaterno = $request["apMaterno"];
      
       if (!filter_var($email, FILTER_VALIDATE_EMAIL)) 
       {
          $response = ['error' => 'Email invalido'];
          return response()->json($response,400);
       }
       $usuario = DB::table('evaluador')->where('Evaluador_email', $email)->first();
       if($usuario && $usuario->Evaluador_email)
       {
           $response = ['error' => "Ya existe el email en el sistema"];
           return response()->json($response,400);
       }

       if($confirmarContraseña != $contraseña)
       {
           $response = ['error' => "Las contraseñas no coinciden"];
           return response()->json($response,400);
       }
      
       if(strlen($contraseña) < 8)
       {
           return response()->json(['error'=>'La contraseña debe ser de 8 caracteres minimo'],400);
       }
     
       $contraseña = Hash::make($contraseña);
       
       $response = DB::insert("insert into evaluador (Evaluador_nombre,Evaluador_apellido_paterno,Evaluador_apellido_materno,Evaluador_email,Evaluador_contraseña) values (?,?,?,?,?)",[$nombre,$apPaterno,$apMaterno,$email,$contraseña]);
       if($response == 0)
       {    
           $response = ['error' => "Error en el servidor"];
           return response()->json($response,400);
           
       }
       $response = ['status' => "Usuario creado correctamente"];
      
       return response()->json($response,201);
    }

}
