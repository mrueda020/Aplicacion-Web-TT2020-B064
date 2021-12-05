<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

use JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use Carbon\Carbon;

use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class ControladorEvaluado extends Controller
{
    //
    public function Login($email, $contraseña)
    {
       if (!filter_var($email, FILTER_VALIDATE_EMAIL)) 
       {
          $response = ['error' => 'Email invalido'];
          return response()->json($response,400);
       }
       $usuario = DB::table('evaluado')->where('Eva_email', $email)->first();
       
       if($usuario && $usuario->Eva_email == $email)
       {    
           if(!Hash::check($contraseña, $usuario->Eva_contraseña))
           {    
               $response = ['error' => "Las contraseñas no coinciden"];
               return response()->json($response,400);
           }
        //    Access Token
           $data = ['sub'=>[
               'email' => $usuario->Eva_email,
               'id' => $usuario->Eva_id,
               'rol' => 'evaluado'
           ]];
           JWTAuth::factory()->setTTL(180);
           $customClaims = JWTFactory::customClaims($data);
           $payload = JWTFactory::make($data);
           $accesToken = JWTAuth::encode($payload);

        //    Refresh Token
           $data = ['sub'=>[
                'id' => $usuario->Eva_id,
                'rol' => 'evaluado'
           ]];
           JWTAuth::factory()->setTTL(43200);
           $customClaims = JWTFactory::customClaims($data);
           $payload = JWTFactory::make($data);
           $refreshToken = JWTAuth::encode($payload);

           $response = ['accessToken' => $accesToken->get() ,
                        'refreshToken' =>$refreshToken->get(),
                        "status" => "Registro Exitoso"
                    ];
           return response()->json($response,200);
       }
       $response = ['error' => "No existe el usuario"];
       return response()->json($response,400);
       
    }

    public function Registro(Request $request)
    {
       //Todo verificar que el email no exista en admin , evaluador 
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
       $usuario = DB::table('evaluado')->where('Eva_email', $email)->first();
       if($usuario && $usuario->Eva_email)
       {
           $response = ['error' => "Ya existe el email en el sistema"];
           return response()->json($response,400);
       }
       $evaluador = DB::table('evaluador')->where('Evaluador_email', $email)->first();
       if($evaluador && $evaluador->Evaluador_email)
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
       
    
       
       $response = DB::insert("insert into evaluado (Eva_nombre,Eva_apellido_paterno,Eva_apellido_materno,Eva_email,Eva_contraseña) values (?,?,?,?,?)",[$nombre,$apPaterno,$apMaterno,$email,Hash::make($contraseña)]);
       if($response == 0)
       {    
           $response = ['error' => "Error en el servidor"];
           return response()->json($response,400);
           
       }

        return $this->Login($email, $contraseña);
    }

    public function obtenerUsuarios()
    {   
        $usuarios = DB::table("usuario")->get();
        return response()->json($usuarios,200);  
    }

    public function cargarGrupos(Request $request, $idEvaluado)
    {   
        try{
            //code...
            $grupos = DB::table('Grupos_Evaluado')->where('Evaluado_Eva_id',$idEvaluado)->get();
            $gruposData = [];
            for($i=0; $i<count($grupos); $i++)
            {
                $grupo = DB::table('Grupo')->where('Gr_id',$grupos[$i]->Grupo_Gr_id)->get();
                // echo($grupo[0]->Evaluador_Evaluador_id);
                $evaluador = DB::table('Evaluador')->select("Evaluador_nombre", "Evaluador_apellido_paterno", "Evaluador_apellido_materno")->where('Evaluador_id',$grupo[0]->Evaluador_Evaluador_id)->get();
               
                array_push($gruposData, (object) array_merge( (array) $grupo[0],(array) $evaluador[0]));
            }
            $myCollectionObj = collect($gruposData);  
            $data = $this->paginate($myCollectionObj,3);
            $response = ["data"=>$gruposData];
            return response()->json($response,200);
        } catch (\Throwable $th) {
            //throw $th;
            $response = ["error"=>$th];
            return response()->json($th,500);
        }  
    }


    public function cargarExamens($idEvaluado, $idGrupo)
    {   
        try {
            //code...

            $grupo = DB::select('select Grupo_Gr_id from Grupos_Evaluado where Evaluado_Eva_id = ? and Grupo_Gr_id = ?',[$idEvaluado,$idGrupo]);
            $examenes = DB::table('Grupo_Examenes')->where('Grupo_Gr_id',$idGrupo)->get();
            $examenesData = [];
            for($i=0; $i<count($examenes); $i++)
            {
                $examen = DB::table('Examen')->where('Exa_id',$examenes[$i]->Examen_Exa_id)->get();  
                array_push($examenesData, $examen[0] );
            }
            $response = ["data"=>$examenesData];
            return response()->json($response,200);
        } catch (\Throwable $th) {
            //throw $th;
            $response = ["error"=>$th];
            return response()->json($examenesData,500);
        }
        
    }


    public function cargarExamen($idEvaluado, $idExamen, $idGrupo)
    {
        try {
            //code...

            $tipoExamen = DB::select("select Exa_tipo_de_examen from Examen where Exa_id = ?",[$idExamen]);

            if($tipoExamen[0]->Exa_tipo_de_examen == "0")
            {
                $response = DB::select("select * from Resultados where Evaluado_Eva_id = ? and Examen_Exa_id = ? and Grupo_Gr_id = ?", [$idEvaluado, $idExamen, $idGrupo]);
                if(!empty($response))
                {
                    return response()->json(["data"=>"El examen ya fue contestado"],404); 
                }      
            }

            $idPreguntas = DB::table('Preguntas_En_Examen')->where('Examen_Exa_id', $idExamen)->get();
            $examen = [];
            for($i=0; $i<count($idPreguntas); $i++)
            {   
                
                $pregunta = DB::select('select * from Pregunta where Pr_id = ?',[$idPreguntas[$i]->Pregunta_Pr_id]);
                // array_push($aux, $pregunta);
                $aux1 = ['pregunta'=> $pregunta];
                $respuestas = DB::select('select * from Respuesta where Pregunta_Pr_id =  ? ',[$idPreguntas[$i]->Pregunta_Pr_id]);
                // array_push($aux, $respuestas);
                $aux2 = ['respuestas'=>$respuestas];
                // array_push($examen, (object)$aux);
                array_push($examen, (object) array_merge( (array) $aux1,(array) $aux2));
            }
            $examenInfo = DB::table('Examen')->where('Exa_id',$idExamen)->get();
            // array_push($examen, ['examenInfo'=>$examenInfo]);
            $response = ["data"=>$examen,"examenInfo"=>$examenInfo];
            return response()->json($response,200);
        } catch (\Throwable $th) {
            //throw $th;
            $response = ["error"=>$th];
            return response()->json($response,500);
        }
        
    }

    public function enviarRespuestasMovil(Request $request)
    {
        $data = $request->all();
        //$respuestas = $data["respuestas"];
        $examenTipo = $data["tipoExamen"];
        
       
        if($examenTipo == '1')
        {
            $response = DB::select("select * from Resultados where Evaluado_Eva_id = ? and  Evaluador_Evaluador_id = ? and Examen_Exa_id = ? and Grupo_Gr_id = ?",
            [$data["idEvaluado"], $data["idEvaluador"], $data["idExamen"], $data["idGrupo"]]);
           // $calificacion = $this->evaluarExamen($respuestas);
            if(empty($response))
            {   
                $response = DB::insert("insert into Resultados(Evaluado_Eva_id, Evaluador_Evaluador_id, Examen_Exa_id, Grupo_Gr_id, Resultados_calificacion, Resultados_fecha_de_realizacion) 
                values(?,?,?,?,?,?)",[$data["idEvaluado"], $data["idEvaluador"], $data["idExamen"], $data["idGrupo"], $data["calificacion"], $data['fechaRealizacion']]);
                return response()->json($response,200);
            }
            $response = DB::update("update Resultados set Resultados_calificacion = ?, Resultados_fecha_de_realizacion = ? where Evaluado_Eva_id = ? and  Evaluador_Evaluador_id = ? and Examen_Exa_id = ? and Grupo_Gr_id = ?",
            [$data["calificacion"], $data['fechaRealizacion'], $data["idEvaluado"], $data["idEvaluador"], $data["idExamen"], $data["idGrupo"]]);
            return response()->json($response,200);

        }
        else
        {
            $response = DB::select("select * from Resultados where Evaluado_Eva_id = ? and  Evaluador_Evaluador_id = ? and Examen_Exa_id = ? and Grupo_Gr_id = ?",
            [$data["idEvaluado"], $data["idEvaluador"], $data["idExamen"], $data["idGrupo"]]);
            if(!empty($response))
            {
                return response()->json(["data"=>"El examen ya fue contestado"],404); 
            }
           // $calificacion = $this->evaluarExamen($respuestas);
            $response = DB::insert("insert into Resultados(Evaluado_Eva_id, Evaluador_Evaluador_id, Examen_Exa_id, Grupo_Gr_id, Resultados_calificacion, Resultados_fecha_de_realizacion) 
            values(?,?,?,?,?,?)",[$data["idEvaluado"], $data["idEvaluador"], $data["idExamen"], $data["idGrupo"], $data["calificacion"], $data['fechaRealizacion']]);
            return response()->json($response,200);
        }

        // $calificacion = $this->evaluarExamen($respuestas);
        // $response = DB::insert("insert into Resultados(Evaluado_Eva_id, Evaluador_Evaluador_id, Examen_Exa_id, Grupo_Gr_id, Resultados_calificacion) 
        // values(?,?,?,?,?)",[$data["idEvaluado"], $data["idEvaluador"], $data["idExamen"], $data["idGrupo"], $calificacion]);
        // return response()->json($response,200);
    }


    public function enviarRespuestas(Request $request)
    {
        $data = $request->all();
        $respuestas = $data["respuestas"];
        $examenTipo = $data["tipoExamen"];
        
       
        if($examenTipo == '1')
        {
            $response = DB::select("select * from Resultados where Evaluado_Eva_id = ? and  Evaluador_Evaluador_id = ? and Examen_Exa_id = ? and Grupo_Gr_id = ?",
            [$data["idEvaluado"], $data["idEvaluador"], $data["idExamen"], $data["idGrupo"]]);
            $calificacion = $this->evaluarExamen($respuestas);
            if(empty($response))
            {   
                $response = DB::insert("insert into Resultados(Evaluado_Eva_id, Evaluador_Evaluador_id, Examen_Exa_id, Grupo_Gr_id, Resultados_calificacion, Resultados_fecha_de_realizacion) 
                values(?,?,?,?,?,?)",[$data["idEvaluado"], $data["idEvaluador"], $data["idExamen"], $data["idGrupo"], $calificacion, $data['fechaRealizacion']]);
                return response()->json($response,200);
            }
            $response = DB::update("update Resultados set Resultados_calificacion = ?, Resultados_fecha_de_realizacion = ? where Evaluado_Eva_id = ? and  Evaluador_Evaluador_id = ? and Examen_Exa_id = ? and Grupo_Gr_id = ?",
            [$calificacion, $data['fechaRealizacion'], $data["idEvaluado"], $data["idEvaluador"], $data["idExamen"], $data["idGrupo"]]);
            return response()->json($response,200);

        }
        else
        {
            $response = DB::select("select * from Resultados where Evaluado_Eva_id = ? and  Evaluador_Evaluador_id = ? and Examen_Exa_id = ? and Grupo_Gr_id = ?",
            [$data["idEvaluado"], $data["idEvaluador"], $data["idExamen"], $data["idGrupo"]]);
            if(!empty($response))
            {
                return response()->json(["data"=>"El examen ya fue contestado"],404); 
            }
            $calificacion = $this->evaluarExamen($respuestas);
            $response = DB::insert("insert into Resultados(Evaluado_Eva_id, Evaluador_Evaluador_id, Examen_Exa_id, Grupo_Gr_id, Resultados_calificacion, Resultados_fecha_de_realizacion) 
            values(?,?,?,?,?,?)",[$data["idEvaluado"], $data["idEvaluador"], $data["idExamen"], $data["idGrupo"], $calificacion, $data['fechaRealizacion']]);
            return response()->json($response,200);
        }

    }

    public function evaluarExamen($respuestas)
    {
        $resultado = 0;
        for($i=0; $i<count($respuestas); $i++)
        {
            if($respuestas[$i]["value"] != "0")
            {
                $resultado++;
            }
        }
        return $calificacion = ($resultado / count($respuestas))*100; 
    }

    public function obtenerResultados($idEvaluado)
    {
        try {
            //code...
            $resultados = [];
            $response = DB::select("select * from Resultados where Evaluado_Eva_id = ?",[$idEvaluado]);
           
            for($i=0; $i<count($response); $i++)
            {
                $data = [];    
                $grupo = DB::select("select Gr_nombre from Grupo where Gr_id = ?",[$response[$i]->Grupo_Gr_id]);
                $examen = DB::select("select Exa_nombre from Examen where Exa_id = ?",[$response[$i]->Examen_Exa_id]);
                array_push($data,  (object) array_merge((array)$grupo[0], (array)$examen[0]));
                array_push($resultados, array_merge((array)$data[0], (array)$response[$i]));
            
            }

            return response()->json($resultados,200);
        } catch (\Throwable $th) {
            //throw $th;
            $response = ["error"=>$th];
            return response()->json($response,500);
        }
    }

    public function actualizarInfo($idEvaluado, Request $request)
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
                DB::update("update Evaluado set Eva_contraseña = ? where Eva_id = ?",[$nuevaContraseña, $idEvaluado]);
            }
            
            if($email)
            {
                if (!filter_var($email, FILTER_VALIDATE_EMAIL)) 
                {
                   $response = ['error' => 'Email invalido'];
                   return response()->json($response,400);
                }
                DB::update("update Evaluado set Eva_email = ? where Eva_id = ?",[$email, $idEvaluado]);
            }

            if($nombre)
            {
                DB::update("update Evaluado set Eva_nombre = ? where Eva_id = ?",[$nombre, $idEvaluado]);
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
                DB::update("update Evaluado set Eva_apellido_paterno = ?, Eva_apellido_materno = ? where Eva_id = ?",
                [$apPaterno, $apMaterno, $idEvaluado]);
            }

            $response = ["message"=>"Usuario Actualizado"];
            return response()->json($response,200);
        } catch (\Throwable $th) {
            //throw $th;
            $response = ["error"=>"Error en el servidor"];
            return response()->json($response,500);
        }
    }

    public function paginate($items, $perPage = 5, $page = null, $options = [])
    {
       
        $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);
        $items = $items instanceof Collection ? $items : Collection::make($items);
        return new LengthAwarePaginator($items->forPage($page, $perPage), $items->count(), $perPage, $page, ['path' => Paginator::resolveCurrentPath()]);
    }

}
