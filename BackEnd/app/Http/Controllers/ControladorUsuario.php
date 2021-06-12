<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

use JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;


class ControladorUsuario extends Controller
{
    public function Login(Request $request)
    {
       $email = $request["email"];
       $contraseña = $request["contraseña"];
       if (!filter_var($email, FILTER_VALIDATE_EMAIL)) 
       {
          $response = ['error' => 'Email invalido'];
          return response()->json($response,400);
       }
       $usuario = DB::table('usuario')->where('email', $email)->first();
       
       if($usuario && $usuario->email == $email)
       {
           if(!Hash::check($contraseña, $usuario->contraseña))
           {
               $response = ['error' => "Las contraseñas no coinciden"];
               return response()->json($response,400);
           }
           $data = ['sub'=>[
               'email' => $usuario->email,
               'rol' => $usuario->rol
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

    public function Registro(Request $request)
    {
       $email = $request["email"];
       $contraseña = $request["contraseña"];
       $confirmarContraseña = $request["confirmarContraseña"];
       $rol = $request["rol"];
      
       if (!filter_var($email, FILTER_VALIDATE_EMAIL)) 
       {
          $response = ['error' => 'Email invalido'];
          return response()->json($response,400);
       }
       $usuario = DB::table('usuario')->where('email', $email)->first();
       if($usuario && $usuario->email)
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
       $rol = Hash::make($rol);
       $response = DB::insert("insert into usuario (email,contraseña,rol) values (?,?,?)",[$email,$contraseña,$rol]);
       if($response == 0)
       {    
           $response = ['error' => "Error en el servidor"];
           return response()->json($response,400);
           
       }
       $response = ['status' => "Usuario creado correctamente"];
      
       return response()->json($response,201);
    }

    public function obtenerUsuarios()
    {   
        $usuarios = DB::table("usuario")->get();
        return response()->json($usuarios,200);  
    }
}
