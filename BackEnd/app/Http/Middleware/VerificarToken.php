<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use JWTAuth;
use Carbon\Carbon;
class VerificarToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if(!$request->hasHeader('Authorization'))
        {
            $response = ['error'=>'No hay token de acceso en la peticion'];
            return response()->json($response,400);
        }
        
        $token = $request->header('Authorization');
        if(empty($token))
        {
            $response = ['error'=>'No hay token de acceso en la peticion'];
            return response()->json($response,400);
        }
        try {
            //code...
            $exp = JWTAuth::setToken($token)->getPayload()->get('exp');
            if(Carbon::now()->timestamp > $exp)
            {
                $response = ['error'=>'El token ha caducado'];
                return response()->json($response,400);
            } 
            $sub = JWTAuth::setToken($token)->getPayload()->get('sub');
            $rol = $sub->rol;
            $usuario = DB::select("select * from Evaluador where Evaluador_id = ? ",[$sub->id]);
            if($rol=='evaluador' && $usuario)
            {
                return $next($request);
            }
            $response = ['error'=>'No tienes el permiso para acceder'];
            return response()->json($response,400);
        } catch (\Throwable $th) {
            //throw $th;
            
            $response = ['error'=>'El token ha caducado'];
            return response()->json($response,400);
        }
    }
}
