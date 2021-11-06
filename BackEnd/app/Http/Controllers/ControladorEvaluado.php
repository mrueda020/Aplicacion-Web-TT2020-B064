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
    public function Login(Request $request)
    {
       $email = $request["email"];
       $contraseña = $request["password"];
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
                        'refreshToken' =>$refreshToken->get()
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
       $apPaterno = $request["apPaterno"];
       $apMaterno = $request["apMaterno"];
      
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
       
       $response = DB::insert("insert into evaluado (Eva_nombre,Eva_apellido_paterno,Eva_apellido_materno,Eva_email,Eva_contraseña) values (?,?,?,?,?)",[$nombre,$apPaterno,$apMaterno,$email,$contraseña]);
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


    public function cargarExamen($idEvaluado, $idExamen)
    {
        try {
            //code...
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
            $response = ["data"=>$examen];
            return response()->json($response,200);
        } catch (\Throwable $th) {
            //throw $th;
            $response = ["error"=>$th];
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
