<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    use WithoutModelEvents;
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::updateOrCreate([
            'id_category' => 1,
            'id_admin' => 1,
            'name' => 'Placa de Vídeo GTG4000',
            'price' => 2500.00,
            'description' => 'Placa de vídeo gamer intermediária',
            'details' => '{
            Top 10 melhores custo beneficio,
            Placa de vídeo tamanho médio,
            8GB RAM dedicada,
            2.5GHz}',
            'stock'=> '5',
            'image'=> 'product/Video_gbranco.png',
        ]);
        Product::updateOrCreate([
            'id_category' => 1,
            'id_admin' => 1,
            'name' => 'Placa de Vídeo GTG3000',
            'price' => 2000.00,
            'description' => 'Placa de vídeo gamer intermediária',
            'details' => '{
            Top 15 melhores custo beneficio,
            Placa de vídeo tamanho médio,
            6GB RAM dedicada,
            2.0GHz}',
            'stock'=> '5',
            'image'=> 'product/Video_gcinza.png',
        ]);
        Product::updateOrCreate([
            'id_category' => 1,
            'id_admin' => 1,
            'name' => 'Placa de Vídeo GTG4500',
            'price' => 3000.00,
            'description' => 'Placa de vídeo gamer intermediária',
            'details' => '{
            Top 10 melhores custo beneficio,
            Placa de vídeo tamanho médio,
            8GB RAM dedicada,
            3.0GHz}',
            'stock'=> '3',
            'image'=> 'product/Video_gpreto.png',
        ]);
    }
}
