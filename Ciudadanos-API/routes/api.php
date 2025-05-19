<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\CiudadanoController;

Route::get('ciudadanos/buscar', [CiudadanoController::class, 'buscar']);

Route::apiResource('ciudadanos', CiudadanoController::class)->except(['destroy']);