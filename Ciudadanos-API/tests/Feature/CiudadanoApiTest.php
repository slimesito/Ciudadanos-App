<?php

namespace Tests\Feature;

use App\Models\Ciudadano;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CiudadanoApiTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /** @test */
    public function puede_listar_ciudadanos()
    {
        Ciudadano::factory()->count(3)->create();

        $response = $this->getJson('/api/ciudadanos');

        $response->assertJsonStructure([
            'success',
            'data'
        ]);
    }

    /** @test */
    public function puede_buscar_un_ciudadano_por_nacionalidad_y_cedula()
    {
        $ciudadano = Ciudadano::factory()->create([
            'nacionalidad' => 'V',
            'cedula' => '12345678',
        ]);

        $response = $this->getJson('/api/ciudadanos/buscar?nacionalidad=V&cedula=12345678');

        $response->assertStatus(200)
                 ->assertJson([
                     'success' => true,
                     'data' => [
                         'id' => $ciudadano->id,
                         'cedula' => '12345678',
                         'nacionalidad' => 'V'
                     ]
                 ]);
    }

    /** @test */
    public function puede_crear_un_nuevo_ciudadano()
    {
        $payload = [
            'cedula' => '87654321',
            'nombres' => 'Juan',
            'apellidos' => 'Pérez',
            'nacionalidad' => 'E',
            'genero' => 'M',
            'estado_civil' => 'S',
            'fecha_nacimiento' => '1990-01-01',
            'fecha_fallecimiento' => null
        ];

        $response = $this->postJson('/api/ciudadanos', $payload);

        $response->assertStatus(201)
                 ->assertJson([
                     'success' => true,
                     'message' => 'Ciudadano registrado exitosamente',
                     'data' => [
                         'cedula' => '87654321',
                         'nombres' => 'Juan'
                     ]
                 ]);

        $this->assertDatabaseHas('ciudadanos', ['cedula' => '87654321']);
    }

    /** @test */
    public function puede_mostrar_un_ciudadano_por_id()
    {
        $ciudadano = Ciudadano::factory()->create();

        $response = $this->getJson("/api/ciudadanos/{$ciudadano->id}");

        $response->assertStatus(200)
                 ->assertJson([
                     'success' => true,
                     'data' => [
                         'id' => $ciudadano->id,
                         'cedula' => $ciudadano->cedula,
                     ]
                 ]);
    }

    /** @test */
    public function puede_actualizar_un_ciudadano()
    {
        $ciudadano = Ciudadano::factory()->create();

        $response = $this->putJson("/api/ciudadanos/{$ciudadano->id}", [
            'nombres' => 'Carlos',
            'apellidos' => 'Ramírez',
        ]);

        $response->assertStatus(200)
                 ->assertJson([
                     'success' => true,
                     'message' => 'Ciudadano actualizado exitosamente',
                     'data' => [
                         'id' => $ciudadano->id,
                         'nombres' => 'Carlos',
                         'apellidos' => 'Ramírez'
                     ]
                 ]);

        $this->assertDatabaseHas('ciudadanos', [
            'id' => $ciudadano->id,
            'nombres' => 'Carlos'
        ]);
    }

    /** @test */
    public function test_rate_limiting_busqueda()
    {
        $limit = config('api.throttle.busqueda.limit', 30);
        
        for ($i = 0; $i < $limit + 1; $i++) {
            $response = $this->getJson('/api/ciudadanos/buscar?nacionalidad=V&cedula=TEST123');
            
            if ($i >= $limit) {
                $response->assertStatus(429);
            }
        }
    }
}
