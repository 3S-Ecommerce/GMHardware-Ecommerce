<?php

namespace Database\Seeders;

use App\Models\Categoria;
use App\Models\Produto;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $catGpu = Categoria::create(['nome' => 'Placas de Vídeo']);
        $catCpu = Categoria::create(['nome' => 'Processadores']);

        Produto::create([
            'nome' => 'NVIDIA GeForce RTX 5090 32GB',
            'preco' => 15999.00,
            'estoque' => 5,
            'id_categoria' => $catGpu->id, // Usamos o ID da categoria que criamos acima
            'detalhes' => 'Arquitetura Blackwell, 32GB GDDR7.',
            'foto' => 'assets/rtx5090.jpg' // Caminho que o Angular vai ler
        ]);

        Produto::create([
            'nome' => 'AMD Ryzen 9 9950X',
            'preco' => 5200.00,
            'estoque' => 10,
            'id_categoria' => $catCpu->id,
            'detalhes' => '16 núcleos e 32 threads, o topo da linha Zen 5.',
            'foto' => 'assets/ryzen9.jpg'
        ]);

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }
}
