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

}
