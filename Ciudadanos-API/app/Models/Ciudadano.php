<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ciudadano extends Model
{
    use HasFactory;

    protected $table = 'ciudadanos';
    protected $primaryKey = 'id';
    
    public $timestamps = true;
    const CREATED_AT = 'fecha_creacion';
    const UPDATED_AT = 'fecha_actualizacion';
    
    protected $fillable = [
        'cedula',
        'nombres',
        'apellidos',
        'nacionalidad',
        'genero',
        'estado_civil',
        'fecha_nacimiento',
        'fecha_fallecimiento'
    ];

    protected $casts = [
        'fecha_nacimiento' => 'date',
        'fecha_fallecimiento' => 'date',
        'fecha_creacion' => 'datetime',
        'fecha_actualizacion' => 'datetime'
    ];
}