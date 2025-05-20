<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        config([
            'api.throttle.busqueda' => [
                'enabled' => env('API_THROTTLE_BUSQUEDA_ENABLED', true),
                'limit' => env('API_THROTTLE_BUSQUEDA_LIMIT', 30),
                'expires' => env('API_THROTTLE_BUSQUEDA_EXPIRES', 1), // minutos
            ]
        ]);
    }
}
