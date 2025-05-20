<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('ciudadanos', function (Blueprint $table) {
            $table->id(); // id autoincremental
            $table->string('cedula')->unique();
            $table->string('nombres');
            $table->string('apellidos');
            $table->string('nacionalidad', 1);
            $table->string('genero', 1);
            $table->string('estado_civil', 1);
            $table->date('fecha_nacimiento');
            $table->date('fecha_fallecimiento')->nullable();
            $table->timestamp('fecha_creacion')->useCurrent();
            $table->timestamp('fecha_actualizacion')->useCurrent()->useCurrentOnUpdate();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ciudadanos');
    }
};
