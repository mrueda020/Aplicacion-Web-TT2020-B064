<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
}
