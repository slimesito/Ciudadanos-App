<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\CiudadanoController;

// Ruta de búsqueda con rate limiting (60 solicitudes por minuto)
Route::get('ciudadanos/buscar', [CiudadanoController::class, 'buscar'])
	->middleware('throttle:busqueda');

// Rutas del recurso con rate limiting
Route::apiResource('ciudadanos', CiudadanoController::class)
    ->except(['destroy'])
    ->middleware('throttle:api');