<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Ciudadano;
use App\Http\Requests\CiudadanoRequest;
use App\Http\Requests\UpdateCiudadanoRequest;
use Illuminate\Http\Request;

class CiudadanoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ciudadanos = Ciudadano::query()
            ->orderBy('id')
            ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $ciudadanos
        ]);
    }

    public function buscar(Request $request)
    {
        $request->validate([
            'nacionalidad' => 'required|string|size:1',
            'cedula' => 'required|string|max:10'
        ]);

        $ciudadano = Ciudadano::where('nacionalidad', $request->nacionalidad)
                            ->where('cedula', $request->cedula)
                            ->first();

        if (!$ciudadano) {
            return response()->json([
                'success' => false,
                'message' => 'Ciudadano no encontrado'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $ciudadano
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CiudadanoRequest $request)
    {
        try {
            $ciudadano = Ciudadano::create($request->validated());
            
            return response()->json([
                'success' => true,
                'message' => 'Ciudadano registrado exitosamente',
                'data' => $ciudadano
            ], 201);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al registrar el ciudadano',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $ciudadano = Ciudadano::find($id);

        if (!$ciudadano) {
            return response()->json([
                'success' => false,
                'message' => 'Ciudadano no encontrado'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $ciudadano
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCiudadanoRequest $request, $id)
    {
        $ciudadano = Ciudadano::findOrFail($id);
        
        // Actualiza solo los campos proporcionados
        $ciudadano->fill($request->validated());
        $ciudadano->save();
        
        return response()->json([
            'success' => true,
            'message' => 'Ciudadano actualizado exitosamente',
            'data' => $ciudadano,
            'changes' => $ciudadano->getChanges()
        ]);
    }
}