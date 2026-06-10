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
        Product::updateOrCreate([
            'id_category' => 8,
            'id_admin' => 1,
            'name' => 'Teclado/ Keyboard k120',
            'price' => 130.00,
            'description' => 'Teclado/ Keyboard USB',
            'details' => 'Logitech, Black, Desk',
            'stock'=> '3',
            'image'=> 'product/V7scGgOYH3VwgFxlM8z86jWrvW8yEMMeALQQAlFM.webp',
            'image_2' => 'product/27CP3jXljedmsCElOrsvHeda2jdHKsuuN4F3sNbX.webp',
            'image_3' => 'product/myzc4nBkKfEEQhWUbOHk9d8fb5AcDLFELp2LLLcb.webp',
            'image_4' => '',
            'image_5' => ''
        ]);
        Product::updateOrCreate([
            'id_category' => 4,
            'id_admin' => 1,
            'name' => 'SSD Kingston 1TB',
            'price' => 1000,
            'description' => 'Armazenamento/ Memory SSD',
            'details' => 'SSD, Nv3 M.2, 1TB, 4000MB/s',
            'stock'=> '3',
            'image'=> 'product/oudfG6V6V7W2Iz4aQfMKZA2njO6dt07UfEdJQ3Mp.webp',
            'image_2' => 'product/Zuyz4y8zYaQ0OwUl8ck0r1l0k9C1ySl6JCJoO8wc.webp',
            'image_3' => 'product/EJ0nk8rWErQub08cMrAIHIiL0EhB5y0Zf6qDgXfr.webp',
            'image_4' => 'product/CM4hdRM7LYuXPuVXOHOGtnUukwuaWSWStd1eDJ52.webp',
            'image_5' => 'product/1es4AjlGWMRZsKK9dCpI7dBdmui8Ix3u4VxMeAAw.webp '
        ]);
        Product::updateOrCreate([
            'id_category' => 8,
            'id_admin' => 1,
            'name' => 'Teclado/ Keyboard Reddragon',
            'price' => 150.99,
            'description' => 'Teclado/ Keyboard USB',
            'details' => 'Reddragon, Mecânico/ Mechanical, Desk, Switch Blue',
            'stock'=> '3',
            'image'=> 'product/emUIQTBaofY9H6bDi9TCJTxClTQFXyuGwVoCoZh3.webp',
            'image_2' => 'product/E1FDECHGmpPGrGmcSyIFDOb3IlGoGPDB1HNWMw6v.webp',
            'image_3' => 'product/yGItBtaqLfmfoDwWEwzCC8XpuSmeBtm0uJ2qGWOG.webp',
            'image_4' => '',
            'image_5' => ''
        ]); 
        Product::updateOrCreate([
            'id_category' => 3,
            'id_admin' => 1,
            'name' => 'Memória RAM/ RAM Memory Fury Beast',
            'price' => 6599.99,
            'description' => 'Memória Ram/ RAM memory Fury Beast RGB 2x64',
            'details' => 'RGB, 2x64GB, 6GHz, DDR5',
            'stock'=> '3',
            'image'=> 'product/vMSpH4hVF0rxI7Gbralb1iVvaF2mw1Kzm0WLezAS.webp',
            'image_2' => 'MiHkvX4ZDSlT2sskB4Q2LyqswjhcQPPcFbszrHjL.webp',
            'image_3' => '',
            'image_4' => '',
            'image_5' => ''
        ]); 
        Product::updateOrCreate([
            'id_category' => 2,
            'id_admin' => 1,
            'name' => 'AMD Threadripper 9980x',
            'price' => 6500.00,
            'description' => 'Threadripper',
            'details' => 'sTR5, 350W, Threads: 128, 5.4 GHz',
            'stock'=> '3',
            'image'=> 'product/MiHkvX4ZDSlT2sskB4Q2LyqswjhcQPPcFbszrHjL.webp',
            'image_2' => '',
            'image_3' => '',
            'image_4' => '',
            'image_5' => ''
        ]); 
        Product::updateOrCreate([
            'id_category' => 5,
            'id_admin' => 1,
            'name' => 'Cooler TGT A-10',
            'price' => 50.00,
            'description' => 'Threadripper',
            'details' => 'RGB/ ARGB, Model TGT A-10, 90MM',
            'stock'=> '40',
            'image'=> 'product/H9o4SGJajyUzGL1I3HeuKhmMeAJF2tqL5NULVi0e.jpg',
            'image_2' => 'product/FAtyYarMKWkGbxnIPAopHcUkHnsfMMiXAePLVXeW.jpg',
            'image_3' => 'product/tZVJpSpip3ETjBFZEMvFrFAGs76LwzUTYN9yJZXF.jpg',
            'image_4' => 'product/WXqxtqK1ZwJ2Dj1B5l9Hrqdq2KifvEotHJ9aogW8.jpg',
            'image_5' => 'product/V0Oqu2JKolagPvEuFXSBkJlGKs4Z8Y11fuluuzJl.jpg'
        ]); 
        Product::updateOrCreate([
            'id_category' => 6,
            'id_admin' => 1,
            'name' => 'Fonte Cooler Master',
            'price' => 550.00,
            'description' => '80 PLUS GOLD',
            'details' => 'PFC Active, Cooler Master MWE, 650W, 127v / 220v Bivolt',
            'stock'=> '15',
            'image'=> 'product/as1FHI0BrPefYx6lQ3whzALTMydKBDDahUoa6oyp.webp',
            'image_2' => '',
            'image_3' => '',
            'image_4' => '',
            'image_5' => ''
        ]); 
        Product::updateOrCreate([
            'id_category' => 7,
            'id_admin' => 1,
            'name' => 'Gabinete Gamer Hyrax Tower',
            'price' => 750.00,
            'description' => 'Format: Mid-Tower',
            'details' => 'ATX - ITX, Black, Modelo: Tower  HGB220B',
            'stock'=> '20',
            'image'=> 'product/Av4fEhK7rnDf3C8R5Kao0bdhNyaSxCbuuxhvSHhS.webp',
            'image_2' => 'product/TMr270PmvCu4Rmhgs6psyYPhZmMo0vh1rGakRXqq.webp',
            'image_3' => 'product/sO5Yo9WyYawxbSXTks71W8KEFDeGdxytdSxQk7oP.webp',
            'image_4' => 'product/MP5bRV9RwYuaDrPUEsV0jQgGArnVy77PKTGoBFH4.webp',
            'image_5' => 'product/U7nnETNNdhRHALCEl0NC7GdSORREmXdceIXUR2bB.webp'
        ]); 
    }
}
