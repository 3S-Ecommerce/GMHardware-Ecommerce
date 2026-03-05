<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create(['name' => 'Placa de Vídeo']);
        Category::create(['name' => 'Processador']);
        Category::create(['name' => 'Memória RAM']);
        Category::create(['name' => 'Armazenamento']);
        Category::create(['name' => 'Cooler']);
        Category::create(['name' => 'Fonte']);
        Category::create(['name' => 'Gabinete']);
        Category::create(['name' => 'Periférico']);
    }
}
