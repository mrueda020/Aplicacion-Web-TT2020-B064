<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
class Auth extends Controller
{
    //
    public function refrescarToken(Request $request)
    {
        $refreshToken = $request['refreshToken'];
        
        try {
            //code...
            $exp = JWTAuth::setToken($refreshToken)->getPayload()->get('exp');
            if(Carbon::now()->timestamp > $exp)
            {
                $response = ['error'=>'El token ha caducado'];
                return response()->json($response,400);
            } 
            $sub = JWTAuth::setToken($refreshToken)->getPayload()->get('sub');
            $rol = $sub->rol;
            switch ($rol) {
                case 'evaluador':
                    # code...
                    $usuario = DB::table('Evaluador')->where('idEvaluador', $sub->id)->first();
                    if(!$usuario)
                    {
                        $response = ['error'=>'No existe el usuario'];
                        return response()->json($response,404);
                    }
                    else
                    {
                        //    Access Token
                        $data = ['sub'=>[
                            'email' => $usuario->Email,
                            'id' => $usuario->idEvaluador,
                            'rol' => 'evaluador'
                        ]];
                        JWTAuth::factory()->setTTL(180);
                        $customClaims = JWTFactory::customClaims($data);
                        $payload = JWTFactory::make($data);
                        $accesToken = JWTAuth::encode($payload);

                        //    Refresh Token
                        $data = ['sub'=>[
                            'id' => $usuario->idEvaluador,
                            'rol' => 'evaluador'
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
                    break;
                case 'evaluado':
                    $usuario = DB::table('Evaluado')->where('idEvaluado', $sub->id)->first();
                    if(!$usuario)
                    {
                        $response = ['error'=>'No existe el usuario'];
                        return response()->json($response,404);
                    }
                    else
                    {
                        //    Access Token
                        $data = ['sub'=>[
                            'email' => $usuario->Email,
                            'id' => $usuario->idEvaluado,
                            'rol' => 'evaluado'
                        ]];
                        JWTAuth::factory()->setTTL(180);
                        $customClaims = JWTFactory::customClaims($data);
                        $payload = JWTFactory::make($data);
                        $accesToken = JWTAuth::encode($payload);

                        //    Refresh Token
                        $data = ['sub'=>[
                            'id' => $usuario->idEvaluado,
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
                    break;
                
                case 'admin':
                    $usuario = DB::table('Admin')->where('idAdmin', $sub->id)->first();
                    if(!$usuario)
                    {
                        $response = ['error'=>'No existe el usuario'];
                        return response()->json($response,404);
                    }
                    else
                    {
                        //    Access Token
                        $data = ['sub'=>[
                            'email' => $usuario->Email,
                            'id' => $usuario->idAdmin,
                            'rol' => 'admin'
                        ]];
                        JWTAuth::factory()->setTTL(180);
                        $customClaims = JWTFactory::customClaims($data);
                        $payload = JWTFactory::make($data);
                        $accesToken = JWTAuth::encode($payload);

                        //    Refresh Token
                        $data = ['sub'=>[
                            'id' => $usuario->idAdmin,
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
                    break;
                $response = ['error'=>'El token ha caducado'];
                return response()->json($response,400);
            }
        } catch (\Throwable $th) {
            //throw $th;
            $response = ['error'=>'El token ha caducado'];
            return response()->json($response,400);
        }
    }


    public function Login(Request $request)
    {
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
                            'refreshToken' =>$refreshToken->get()
                        ];
            return response()->json($response,200);
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
                "nombre" => $usuario->Eva_nombre,
                "apellido"=> $usuario->Eva_apellido_paterno,
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


}
