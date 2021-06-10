<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class ControladorUsuario extends Controller
{
    public function Login(Request $request)
    {
       $email = $request["email"];
       $contraseña = $request["contraseña"];
       //TODO verificar con una regex si es un email
       $usuario = DB::table('usuario')->where('email', $email)->first();
       
       if($usuario && $usuario->email == $email)
       {
           //TODO desencryptar los datos del usuario
           if($usuario->contraseña != $contraseña)
           {
               $response = ['error' => "Las contraseñas no coinciden"];
               return response()->json($response,400);
           }
           $response = ['status' => "Login correcto"];
        //    $token = $usuario->createToken('Test')->plainTextToken;
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
       // TODO Verificar con una regex si es un email
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
       //TODO Verificar longitud de contraseña a 8 caracteres minimo

       //TODO encryptar los datos del usuario
       $response = DB::insert("insert into usuario (email,contraseña,rol) values (?,?,?)",[$email,$contraseña,"evaluado"]);
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
