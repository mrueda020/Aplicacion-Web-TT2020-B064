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
    public function Login($email, $contraseña)
    {
       
       try {
           //code...
            // $email = $request["email"];
            // $contraseña = $request["password"];
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) 
            {
                $response = ['error' => 'Email invalido'];
                return response()->json($response,400);
            }
            $usuario = DB::table('Evaluador')->where('Evaluador_email', $email)->first();
            if($usuario && $usuario->Evaluador_email == $email)
            {  
                if(!Hash::check($contraseña, $usuario->Evaluador_contraseña))
                {
                    $response = ['error' => "Las contraseñas no coinciden"];
                    return response()->json($response,400);
                }
                //    Access token
                $data = ['sub'=>[
                    "nombre" => $usuario->Evaluador_nombre,
                    "apellido"=> $usuario->Evaluador_apellido_paterno,
                    'email' => $usuario->Evaluador_email,
                    'id' => $usuario->Evaluador_id,
                    'rol' => 'evaluador'
                ]];
                JWTAuth::factory()->setTTL(180);
                $customClaims = JWTFactory::customClaims($data);
                $payload = JWTFactory::make($data);
                $accessToken = JWTAuth::encode($payload);
                //   Refresh Token
                $data = ['sub'=>[
                    'id' => $usuario->Evaluador_id,
                    'rol' => 'evaluador'
                ]];
                JWTAuth::factory()->setTTL(43200);
                $customClaims = JWTFactory::customClaims($data);
                $payload = JWTFactory::make($data);
                $refreshToken = JWTAuth::encode($payload);
                $response = ['accessToken' => $accessToken->get() ,
                             'refreshToken' =>$refreshToken->get(),
                             "status" => "Registro Exitoso"
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

    public function registrarEvaluador(Request $request)
    {
       //Todo verificar que el email no exista en evaluado , admin 
       $email = $request["email"];
       $contraseña = $request["password"];
       $confirmarContraseña = $request["confirmarPassword"];
       $nombre = $request["nombre"];
       $apellidos = explode(" ",$request["apellidos"]);
       $apPaterno = " ";
       $apMaterno = " ";
       if(count($apellidos) >= 2)
       {
        $apPaterno = $apellidos[0];
        $apMaterno = $apellidos[1];
       }
       else {
           # code...
           $apPaterno = $request["apellidos"];
           $apMaterno = " ";
       }
      
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

       $evaluado = DB::table('evaluado')->where('Eva_email', $email)->first();
       if($evaluado && $evaluado->Eval_email)
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
     
       
       $response = DB::insert("insert into evaluador (Evaluador_nombre,Evaluador_apellido_paterno,Evaluador_apellido_materno,Evaluador_email,Evaluador_contraseña) values (?,?,?,?,?)",[$nombre,$apPaterno,$apMaterno,$email,Hash::make($contraseña)]);
       if($response == 0)
       {    
           $response = ['error' => "Error en el servidor"];
           return response()->json($response,400);
           
       }
       return $this->Login($email, $contraseña);
    }


    public function agregarPregunta(Request $request)
    {
        try {
            $size = count($request->all());
            $idEvaluador = $request["idEvaluador"];
            $pregunta = $request["pregunta"];
            $area = $request["area"];
            $respuestaCorrecta = $request["respuestaCorrecta"];
            DB::insert('insert into pregunta (Pr_pregunta,Evaluador_Evaluador_id) values (?,?)', [$pregunta,$idEvaluador]);
            $idPregunta = DB::getPdo()->lastInsertId();
            for($i=0; $i<$size-3; $i++)
            {   
                if("respuesta".($i) == $respuestaCorrecta)
                {
                    DB::insert('insert into respuesta (Res_respuesta, Res_es_correcta, Pregunta_Pr_id) values (?,?,?)',[$request["respuesta".($i)],1,$idPregunta]); 
                }
                else
                {
                    DB::insert('insert into respuesta (Res_respuesta, Res_es_correcta, Pregunta_Pr_id) values (?,?,?)',[$request["respuesta".($i)],0,$idPregunta]);  
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
            $preguntaEliminada = DB::delete('delete from pregunta where Pr_id = ? and Evaluador_Evaluador_id = ? ',[$idPregunta, $idEvaluador]);
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
           $preguntas = DB::table('pregunta')->where('Evaluador_Evaluador_id',$id)->get();
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
            $preguntas = DB::select("select Pr_id, Pr_pregunta from pregunta");
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

    public function crearExamen(Request $request)
    {
        try {
            $examenData = $request->all();
            $noPreguntas = count($examenData["questionsIds"]);
            DB::insert('insert into Examen (Exa_nombre, Exa_description, Evaluador_Evaluador_id
            , Exa_tipo_de_examen,Exa_no_preguntas,Exa_fecha_aplicacion_inicio, Exa_fecha_aplicacion_fin) values (?,?,?,?,?,?,?)',[
               $examenData["name"], $examenData["description"], $examenData["idEvaluador"], $examenData["typeExam"],
               $noPreguntas, $examenData["dates"][0], $examenData["dates"][1]
            ]);
            $idExamen = DB::getPdo()->lastInsertId();
            if(!$examenData["typeExam"]) //Si no es un examen de prueba
                DB::table('Examen')->where('Exa_id',$idExamen)->update(['Exa_fecha_aplicacion_inicio'=>$examenData["dates"][0], 'Exa_fecha_aplicacion_fin'=>$examenData["dates"][1]]);
            
            for($i=0; $i<$noPreguntas; $i++)
            {
                DB::insert('insert into Preguntas_En_Examen (Examen_Exa_id, Pregunta_Pr_id) 
                values(?,?)',[$idExamen, $examenData["questionsIds"][$i]] );

            }
            
            
            $response = ["data" => $examenData];
            return response()->json($response, 200);

        } catch (\Throwable $th) {
            $response = ["error" => $th];
            return response()->json($response, 500);
        }
        
        
    }

    public function obtenerEvaluados()
    {
        try {
            //code...
            $evaluados = DB::table('Evaluado')->select('Eva_id',"Eva_nombre",
                "Eva_apellido_paterno","Eva_apellido_materno")->get();
            $response = ["data" => $evaluados];
            return response()->json($response,200);
        } catch (\Throwable $th) {
            //throw $th;
            $response = ["error" => $th];
            return response()->json($response,500);
        }
    }

    public function crearGrupo(Request $request)
    {
        try {
            $idEvaluador = $request["idEvaluador"];
            $nombre = $request["name"];
            $descripcion = $request["description"];
            $usersIds = $request["usersIds"];
            DB::insert('insert into Grupo (Evaluador_Evaluador_id, Gr_nombre, Gr_descripcion)
            values (?,?,?)',[$idEvaluador, $nombre, $descripcion]);
            $idGrupo = DB::getPdo()->lastInsertId();
            // print($idGrupo);
            DB::insert('insert into Grupos_Evaluador (Evaluador_Evaluador_id, Grupo_Gr_id) 
            values(?,?)',[$idEvaluador, $idGrupo]);

            for($i=0; $i<count($usersIds); $i++)
            {
                DB::insert('insert into Grupos_Evaluado (Evaluado_Eva_id, Grupo_Gr_id ) 
                values(?,?)',[$usersIds[$i],$idGrupo]);
            }

            return response()->json(["data"=>"Grupo creado"],200);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json(["error"=>$th],500);
        }
    }

    public function obtenerExamenes()
    {
        try {
            //code...
            $examenes = DB::select("select * from Examen");
            $reponse = ["data"=>$examenes];
            return response()->json($reponse,200);
        } catch (\Throwable $th) {
            //throw $th;
            $response = ["error" => $th];
            return response()->json($response,500);
        }
    }

    public function obtenerExamenesEvaluador($idEvaluador)
    {
        try {
            // code...
            $examenes = DB::select("select * from Examen where Evaluador_Evaluador_id = ? ",[$idEvaluador]);
            $response = ["data"=>$examenes];
            return response()->json($response,200);
        } catch (\Throwable $th) {
            //throw $th;
            $response = ["error" => $th];
            return response()->json($response,500);
        }
    }

    public function eliminarExamen($idEvaluador, $idExamen)
    {
        try {
            //code...
            $examenEliminado = DB::delete('delete from examen where Exa_id = ? and Evaluador_Evaluador_id = ? ',[$idExamen, $idEvaluador]);
            if($examenEliminado)
            {
                $response = ["message" => "Examen eliminado"];
                return response()->json($response,200);
            }
            else
            {
                $response = ["error" => "No existe el examen"];
                return response()->json($response,404);
            }
        } catch (\Throwable $th) {
            //throw $th;
            $response = ["error" => $th];
            return response()->json($response,500);
        }
    }
    
    public function obtenerGrupos($idEvaluador)
    {
        try {
            //code...
            $grupos = DB::select('select * from grupo where Evaluador_Evaluador_id = ?',[$idEvaluador]);
            $reponse = ["data"=>$grupos];
            return response()->json($reponse,200);
        } catch (\Throwable $th) {
            //throw $th;
            $response = ["error" => $th];
            return response()->json($response,500);
        }
    }

    public function eliminarGrupo($idEvaluador, $idGrupo)
    {
        try {
            //code...
            $grupoEliminado = DB::delete('delete from grupo where Gr_id = ? and Evaluador_Evaluador_id = ? ',[$idGrupo, $idEvaluador]);
            if($grupoEliminado)
            {
                $response = ["message" => "Grupo eliminado"];
                return response()->json($response,200);
            }
            else
            {
                $response = ["error" => "No existe el grupo"];
                return response()->json($response,404);
            }
        } catch (\Throwable $th) {
            //throw $th;
            $response = ["error" => $th];
            return response()->json($response,500);
        }
    }

    public function asignarExamenes(Request $request)
    {
        try {
            //code...
            $data = $request->all();
            $gruposIds = $data["groupIds"];
            $examenesIds = $data["examsIds"];
            
            for($i=0; $i<count($gruposIds); $i++)
            {
                for($j=0; $j<count($examenesIds); $j++)
                {
                    $rows = DB::select('select * from Grupo_Examenes where Grupo_Gr_id = ? 
                    and Examen_Exa_id = ? ',[$gruposIds[$i],$examenesIds[$j]]);
                    if(count($rows)==0)
                        DB::insert('insert ignore  into Grupo_Examenes (Grupo_Gr_id, Examen_Exa_id) 
                        values(?,?)',[$gruposIds[$i],$examenesIds[$j]]);
                }
            }

            $response = ["data"=>"Examen asignado"];
            return response()->json($response,200);
        } catch (\Throwable $th) {
            //throw $th;
            $response = ["error" => $th];
            // printf($th);
            return response()->json($response,500);
        }
    }

    public function actualizarInfo($idEvaluador, Request $request)
    {
        try {
            //code...
            $data = $request->all();
            $contraseña = $data["password"];
            $confirmarContraseña = $data["confirmPassword"];
            $email = $data["email"];
            $nombre = $data["name"];
            $apellidos = $data["surname"];

            if(!$email && !$nombre && !$apellidos && !$contraseña && !$confirmarContraseña )
            {
                $response = ['error' => 'Los campos no deben estar vacios'];
                return response()->json($response,400);
            }

            if($contraseña && $contraseña!="")
            {
                if($confirmarContraseña != $contraseña)
                {
                    $response = ['error' => "Las contraseñas no coinciden"];
                    return response()->json($response,400);
                }
           
                if(strlen($contraseña) < 8)
                {
                    return response()->json(['error'=>'La contraseña debe ser de 8 caracteres minimo'],400);
                }
                $nuevaContraseña = Hash::make($contraseña);
                DB::update("update Evaluador set Evaluador_contraseña = ? where Evaluador_id = ?",[$nuevaContraseña, $idEvaluador]);
            }
            
            if($email)
            {
                if (!filter_var($email, FILTER_VALIDATE_EMAIL)) 
                {
                   $response = ['error' => 'Email invalido'];
                   return response()->json($response,400);
                }
                DB::update("update Evaluador set Evaluador_email = ? where Evaluador_id = ?",[$email, $idEvaluador]);
            }

            if($nombre)
            {
                DB::update("update Evaluador set Evaluador_nombre = ? where Evaluador_id = ?",[$nombre, $idEvaluador]);
            }

            if($apellidos)
            {   
                $apPaterno = $apellidos;
                $apellidos = explode(" ",$apellidos);
                // $apPaterno = " ";
                $apMaterno = " ";
                if(count($apellidos) >= 2)
                {
                 $apPaterno = $apellidos[0];
                 $apMaterno = $apellidos[1];
                }
                DB::update("update Evaluador set Evaluador_apellido_paterno = ?, Evaluador_apellido_materno = ? where Evaluador_id = ?",
                [$apPaterno, $apMaterno, $idEvaluador]);
            }

            $response = ["message"=>"Usuario Actualizado"];
            return response()->json($response,200);
        } catch (\Throwable $th) {
            //throw $th;
            $response = ["error"=>"Error en el servidor"];
            return response()->json($th,500);
        }
    }

}
