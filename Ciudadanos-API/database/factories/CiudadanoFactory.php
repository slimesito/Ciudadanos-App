<?php

namespace Database\Factories;

use App\Models\Ciudadano;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ciudadano>
 */
class CiudadanoFactory extends Factory
{
    protected $model = Ciudadano::class;

    public function definition(): array
    {
        return [
            'cedula' => $this->faker->unique()->numerify('##########'),
            'nombres' => $this->faker->firstName(),
            'apellidos' => $this->faker->lastName(),
            'nacionalidad' => $this->faker->randomElement(['V', 'E']),
            'genero' => $this->faker->randomElement(['M', 'F']),
            'estado_civil' => $this->faker->randomElement(['S', 'C', 'D', 'V']),
            'fecha_nacimiento' => $this->faker->date(),
            'fecha_fallecimiento' => null,
        ];
    }
}
