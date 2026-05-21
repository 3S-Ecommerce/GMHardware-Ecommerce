<?php

use Illuminate\Support\Facades\Route;

Route::get('/setup-db', function () {
    try {
        // 1. Executa as Migrations (Cria as tabelas no Supabase)
        // O '--force' é obrigatório para rodar em produção (Render)
        Artisan::call('migrate:fresh', ['--force' => true]);
        $migrationOutput = Artisan::output();

        // 2. Executa os Seeders (Insere os dados de Prédios, Elevadores, etc.)
        Artisan::call('db:seed', ['--force' => true]);
        $seederOutput = Artisan::output();
        
        return response()->json([
            'status' => 'sucesso',
            'detalhes' => [
                'migration' => $migrationOutput,
                'seeding' => $seederOutput
            ]
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'erro',
            'mensagem' => $e->getMessage()
        ], 500);
    }
});
