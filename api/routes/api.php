<?php

use Illuminate\Http\Request;
use App\Models\Produto;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/produtos', function () {
    /*
        O método ::with('categoria') traz os dados da categoria junto com o produto
        O método ::all() busca tudo que está no banco
    */
        return Produto::with('categoria')->get();
    // $catalogo = [
    //     'Placas de Vídeo' => [
    //         ['nome' => 'NVIDIA GeForce RTX 5090 32GB', 'preco' => 15999],
    //         ['nome' => 'NVIDIA GeForce RTX 4060 Ti 8GB', 'preco' => 2800],
    //         ['nome' => 'AMD Radeon RX 7800 XT 16GB', 'preco' => 3900],
    //         ['nome' => 'NVIDIA GeForce RTX 4070 Super', 'preco' => 4500],
    //         ['nome' => 'AMD Radeon RX 7600 8GB', 'preco' => 1800],
    //     ],
    //     'Processadores' => [
    //         ['nome' => 'AMD Ryzen 9 9950X', 'preco' => 5200],
    //         ['nome' => 'Intel Core i9-14900K', 'preco' => 4800],
    //         ['nome' => 'AMD Ryzen 7 7800X3D', 'preco' => 3100],
    //         ['nome' => 'Intel Core i5-13600K', 'preco' => 2100],
    //         ['nome' => 'AMD Ryzen 5 5600', 'preco' => 850],
    //     ],
    //     'Memórias RAM' => [
    //         ['nome' => 'Corsair Vengeance 32GB (2x16) DDR5 6000MHz', 'preco' => 1100],
    //         ['nome' => 'Kingston Fury Beast 16GB DDR4 3200MHz', 'preco' => 350],
    //         ['nome' => 'G.Skill Trident Z5 64GB DDR5 6400MHz', 'preco' => 2400],
    //         ['nome' => 'Team Group T-Force 16GB DDR4 3600MHz', 'preco' => 380],
    //         ['nome' => 'XPG Spectrix D50 8GB DDR4 3200MHz', 'preco' => 220],
    //     ],
    //     'SSDs' => [
    //         ['nome' => 'SSD Samsung 990 Pro 2TB NVMe Gen4', 'preco' => 1400],
    //         ['nome' => 'SSD WD Black SN850X 1TB NVMe', 'preco' => 750],
    //         ['nome' => 'SSD Kingston NV2 1TB NVMe Gen4', 'preco' => 420],
    //         ['nome' => 'SSD Crucial BX500 480GB SATA', 'preco' => 280],
    //         ['nome' => 'SSD Hiksemi Future 2TB NVMe', 'preco' => 950],
    //     ],
    //     'Gabinetes' => [
    //         ['nome' => 'Lian Li O11 Dynamic EVO', 'preco' => 1300],
    //         ['nome' => 'NZXT H9 Flow White', 'preco' => 1150],
    //         ['nome' => 'Corsair 4000D Airflow', 'preco' => 650],
    //         ['nome' => 'Pichau Hive Mid Tower', 'preco' => 300],
    //         ['nome' => 'Cooler Master MasterBox TD500', 'preco' => 550],
    //     ],
    //     'Coolers' => [
    //         ['nome' => 'Water Cooler NZXT Kraken 360 RGB', 'preco' => 1600],
    //         ['nome' => 'DeepCool AK620 Digital', 'preco' => 480],
    //         ['nome' => 'Corsair iCUE H150i Elite', 'preco' => 1400],
    //         ['nome' => 'Air Cooler Cooler Master Hyper 212', 'preco' => 200],
    //         ['nome' => 'Water Cooler Rise Mode 240mm', 'preco' => 280],
    //     ],
    //     'Fontes' => [
    //         ['nome' => 'Corsair RM850x 850W Gold Modular', 'preco' => 890],
    //         ['nome' => 'XPG Core Reactor 750W Gold', 'preco' => 620],
    //         ['nome' => 'MSI MAG A650BN 650W Bronze', 'preco' => 350],
    //         ['nome' => 'Super Flower Leadex III 1000W Gold', 'preco' => 1100],
    //         ['nome' => 'EVGA 600W White', 'preco' => 290],
    //     ],
    //     'Periféricos' => [
    //         ['nome' => 'Logitech G Pro X Superlight 2', 'preco' => 900],
    //         ['nome' => 'Teclado Mecânico Razer BlackWidow V4', 'preco' => 1200],
    //         ['nome' => 'Headset HyperX Cloud III', 'preco' => 650],
    //         ['nome' => 'Mousepad Zowie G-SR-SE', 'preco' => 350],
    //         ['nome' => 'Monitor Alienware 27" 360Hz', 'preco' => 4200],
    //     ]
    // ];
    
    // $produtos = [];

    // $id = 1;
    // foreach ( $catalogo as $categoria => $itens){
    //     foreach ( $itens as $produto ){
    //         $produtos[] = [
    //             'id' => $id++,
    //             'nome' => $produto['nome'],
    //             'preco' => $produto['preco'],
    //             'categoria' => $categoria
    //         ];
    //     }
    // }
    // return response()->json($produtos);
});
