<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CiudadanoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Cambia esto según tus necesidades de autenticación/autorización
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $ciudadano = $this->route('ciudadano');
        
        $uniqueCedulaRule = Rule::unique('ciudadanos', 'cedula');
        
        if ($ciudadano) {
            $uniqueCedulaRule->ignore($ciudadano->id);
        }

        return [
            'cedula' => [
                'required',
                'string',
                'max:10',
                $uniqueCedulaRule
            ],
            'nombres' => 'required|string|max:100',
            'apellidos' => 'required|string|max:100',
            'nacionalidad' => 'required|string|in:V,E',
            'genero' => 'required|string|in:F,M',
            'estado_civil' => 'required|string|in:S,C,V',
            'fecha_nacimiento' => 'required|date',
            'fecha_fallecimiento' => 'nullable|date|after_or_equal:fecha_nacimiento',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'cedula.required' => 'La cédula es obligatoria',
            'cedula.unique' => 'Esta cédula ya está registrada',
            'nombres.required' => 'Los nombres son obligatorios',
            'apellidos.required' => 'Los apellidos son obligatorios',
            'genero.in' => 'El género debe ser F (Femenino) o M (Masculino)',
            'estado_civil.in' => 'El estado civil debe ser S (Soltero/a), C (Casado/a) o V (Viudo/a)',
            'fecha_fallecimiento.after_or_equal' => 'La fecha de fallecimiento debe ser posterior o igual a la fecha de nacimiento',
        ];
    }
}