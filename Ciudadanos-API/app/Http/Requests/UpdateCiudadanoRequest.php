<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCiudadanoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation()
    {
        // Elimina el campo cédula si está presente
        if ($this->has('cedula')) {
            $this->request->remove('cedula');
        }
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'nombres' => 'sometimes|string|max:100',
            'apellidos' => 'sometimes|string|max:100',
            'nacionalidad' => 'sometimes|string|size:1',
            'genero' => 'sometimes|string|in:F,M',
            'estado_civil' => 'sometimes|string|in:S,C,V',
            'fecha_nacimiento' => 'sometimes|date',
            'fecha_fallecimiento' => 'nullable|date|after_or_equal:fecha_nacimiento'
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'nombres.required' => 'Los nombres son obligatorios',
            'nombres.max' => 'Los nombres no deben exceder los 100 caracteres',
            'apellidos.required' => 'Los apellidos son obligatorios',
            'apellidos.max' => 'Los apellidos no deben exceder los 100 caracteres',
            'nacionalidad.required' => 'La nacionalidad es obligatoria',
            'nacionalidad.size' => 'La nacionalidad debe ser de 1 carácter',
            'genero.required' => 'El género es obligatorio',
            'genero.in' => 'El género debe ser F (Femenino) o M (Masculino)',
            'estado_civil.required' => 'El estado civil es obligatorio',
            'estado_civil.in' => 'El estado civil debe ser S (Soltero/a), C (Casado/a) o V (Viudo/a)',
            'fecha_nacimiento.required' => 'La fecha de nacimiento es obligatoria',
            'fecha_nacimiento.date' => 'La fecha de nacimiento debe ser una fecha válida',
            'fecha_fallecimiento.date' => 'La fecha de fallecimiento debe ser una fecha válida',
            'fecha_fallecimiento.after_or_equal' => 'La fecha de fallecimiento debe ser igual o posterior a la fecha de nacimiento'
        ];
    }
}