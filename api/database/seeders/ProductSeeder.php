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
            'details' => 'Top 10 melhores custo beneficio, Placa de vídeo tamanho médio, 8GB RAM dedicada, 2.5GHz',
            'stock'=> '5',
            'image' => 'product/8OR3xtXsNHFUyqc99PNO0MJh5rQxa7qWKgZ9E0yE.jpg',
            'image_2' => 'product/XgodPr6Cf20nrHHHFWlGMeecyX2yWLiLozhIBYQ9.jpg',
            'image_3' => 'product/UMGNjoqifiFZxeG3knmVVx1RiL3URpyd4sQ5shgF.jpg',
            'image_4' => 'product/NXDbmZGhBlgzl0eOjCP5bmFkW7aDtRxxmH152Pws.jpg',
            'image_5' => 'product/GIvx7on6PLd9I6q8LExzlom1BtHwA43TY6hUgVcA.jpg'
        ]);
        Product::updateOrCreate([
            'id_category' => 1,
            'id_admin' => 1,
            'name' => 'Placa de Vídeo GTG3000',
            'price' => 2000.00,
            'description' => 'Placa de vídeo gamer intermediária',
            'details' => 'Top 15 melhores custo beneficio, Placa de vídeo tamanho médio, 6GB RAM dedicada, 2.0GHz',
            'stock'=> '5',
            'image'=> 'product/GIvx7on6PLd9I6q8LExzlom1BtHwA43TY6hUgVcA.jpg',
            'image_2' => 'product/8OR3xtXsNHFUyqc99PNO0MJh5rQxa7qWKgZ9E0yE.jpg',
            'image_3' => 'product/XgodPr6Cf20nrHHHFWlGMeecyX2yWLiLozhIBYQ9.jpg',
            'image_4' => 'product/UMGNjoqifiFZxeG3knmVVx1RiL3URpyd4sQ5shgF.jpg',
            'image_5' => 'product/NXDbmZGhBlgzl0eOjCP5bmFkW7aDtRxxmH152Pws.jpg'
        ]);
        Product::updateOrCreate([
            'id_category' => 1,
            'id_admin' => 1,
            'name' => 'Placa de Vídeo GTG4500',
            'price' => 3000.00,
            'description' => 'Placa de vídeo gamer intermediária',
            'details' => 'Top 10 melhores custo beneficio, Placa de vídeo tamanho médio, 8GB RAM dedicada, 3.0GHz',
            'stock'=> '3',
            'image'=> 'product/NXDbmZGhBlgzl0eOjCP5bmFkW7aDtRxxmH152Pws.jpg',
            'image_2' => 'product/GIvx7on6PLd9I6q8LExzlom1BtHwA43TY6hUgVcA.jpg',
            'image_3' => 'product/8OR3xtXsNHFUyqc99PNO0MJh5rQxa7qWKgZ9E0yE.jpg',
            'image_4' => 'product/XgodPr6Cf20nrHHHFWlGMeecyX2yWLiLozhIBYQ9.jpg',
            'image_5' => 'product/UMGNjoqifiFZxeG3knmVVx1RiL3URpyd4sQ5shgF.jpg'
        ]);
    }
}
