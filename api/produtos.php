<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$produtos = [
    [
        "id" => 1,
        "nome" => "Teclado Mecânico RGB",
        "preco" => 250.00,
        "imagem" => "https://placeholder.com/150",
        "descricao" => "Teclado switch blue com iluminação customizável."
    ],
    [
        "id" => 2,
        "nome" => "Mouse Gamer 12000 DPI",
        "preco" => 120.50,
        "imagem" => "https://placeholder.com/150",
        "descricao" => "Mouse ergonômico com 6 botões programáveis."
    ],
    [
        "id" => 3,
        "nome" => "Memória RAM 16GB 3000mHz",
        "preco" => 1000.00,
        "imagem" => "https://placeholder.com/150",
        "descricao" => "Memória RAM de 16GB com um clock base de 3000mHz, com RGB"
    ],
    [
        "id" => 4,
        "nome" => "Processador Intel core i7 15k",
        "preco" => 2050.50,
        "imagem" => "https://placeholder.com/150",
        "descricao" => "Processador Intel core i7 15773k"
    ],
];
echo json_encode($produtos);
?>