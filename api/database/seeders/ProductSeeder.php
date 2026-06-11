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
            'name' => 'Placa De Vídeo Msi Rtx 5060',
            'price' => 2000.00,
            'description' => 'Placa de vídeo gamer intermediária',
            'details' => 'Top 15 melhores custo beneficio, Placa de vídeo tamanho médio, 6GB RAM dedicada, 2.0GHz',
            'stock' => '100',
            'image' => 'product/y93yK1uMn9mk4bGjk85nb8lGSE0Atj62YVPjYbhH.png',
            'image_2' => 'product/66jO9bWEFyb0aGCgESM8JiMTVdWSZ23cLz5pdNLk.png',
            'image_3' => 'product/SX2nAlWBm1d1fzyb1eaKNyYGTaJrMZWAlzhTulyj.png',
            'image_4' => 'product/tFohJtnbYbKlcgK5IXEBIxiR4RG5g0wdNcUiSsdz.png',
            'image_5' => 'product/9EoeyGYCg3maRSbQDbLmC6LbB8m4ytjKhaXg75NV.png'
        ]);
        Product::updateOrCreate([
            'id_category' => 1,
            'id_admin' => 1,
            'name' => 'Placa de Vídeo GTX 550',
            'price' => 2500.00,
            'description' => 'Placa de vídeo gamer intermediária',
            'details' => 'Top 10 melhores custo beneficio, Placa de vídeo tamanho médio, 8GB RAM dedicada, 2.5GHz',
            'stock' => '125',
            'image' => 'product/n0uqfPGgQiL0h8qpX8wGDQKyX76uE47SqBeOERpY.png',
            'image_2' => 'product/x3CsmEKUqQDHKLhd3M046b3FdgYtlS3BVEHYjaJR.png',
            'image_3' => 'product/J8dm674X4UQjuAeMnPW5UCe20AmsCNCxpXocs5Lf.png',
            'image_4' => 'product/FoEm4xUmpetNr92tFLfQHUGVfjQVT6YVnKgETYz0.png',
            'image_5' => 'product/hRKHKMKlEhX18JUTrpHUljwRpGC10AxEbUxaPF53.png'
        ]);
        Product::updateOrCreate([
            'id_category' => 1,
            'id_admin' => 1,
            'name' => 'Placa De Vídeo Gigabyte Rtx 5090',
            'price' => 3000.00,
            'description' => 'Placa de vídeo gamer intermediária',
            'details' => 'Top 10 melhores custo beneficio, Placa de vídeo tamanho médio, 8GB RAM dedicada, 3.0GHz',
            'stock' => '230',
            'image' => 'product/3MOsbzhjyR6RIuNeqYqv8y0Kg1RPojdI0vxH6SYV.png',
            'image_2' => 'product/2XCSkfjU44bvDnK1e9zT7vvpADtsfDmeYLeiMtiH.png',
            'image_3' => 'product/C1vjEbsbPUL1ituGZwB9SkNt6ERQZsqiCsrMymr0.png',
            'image_4' => 'product/UluZvZuyqNrjKn5KYsGqRcFdfnZWrgQRXQweGBRG.png',
            'image_5' => 'product/X8iuC62aETbFue6UX1P2aXKDS33fUeo9m1GX4FpO.png'
        ]);
        Product::updateOrCreate([
            'id_category' => 8,
            'id_admin' => 1,
            'name' => 'Teclado/ Keyboard k120',
            'price' => 130.00,
            'description' => 'Teclado/ Keyboard USB',
            'details' => 'Logitech, Black, Desk',
            'stock' => '3',
            'image' => 'product/V7scGgOYH3VwgFxlM8z86jWrvW8yEMMeALQQAlFM.webp',
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
            'stock' => '3',
            'image' => 'product/oudfG6V6V7W2Iz4aQfMKZA2njO6dt07UfEdJQ3Mp.webp',
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
            'stock' => '3',
            'image' => 'product/emUIQTBaofY9H6bDi9TCJTxClTQFXyuGwVoCoZh3.webp',
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
            'stock' => '3',
            'image' => 'product/vMSpH4hVF0rxI7Gbralb1iVvaF2mw1Kzm0WLezAS.webp',
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
            'stock' => '3',
            'image' => 'product/MiHkvX4ZDSlT2sskB4Q2LyqswjhcQPPcFbszrHjL.webp',
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
            'stock' => '40',
            'image' => 'product/H9o4SGJajyUzGL1I3HeuKhmMeAJF2tqL5NULVi0e.jpg',
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
            'stock' => '15',
            'image' => 'product/as1FHI0BrPefYx6lQ3whzALTMydKBDDahUoa6oyp.webp',
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
            'stock' => '20',
            'image' => 'product/Av4fEhK7rnDf3C8R5Kao0bdhNyaSxCbuuxhvSHhS.webp',
            'image_2' => 'product/TMr270PmvCu4Rmhgs6psyYPhZmMo0vh1rGakRXqq.webp',
            'image_3' => 'product/sO5Yo9WyYawxbSXTks71W8KEFDeGdxytdSxQk7oP.webp',
            'image_4' => 'product/MP5bRV9RwYuaDrPUEsV0jQgGArnVy77PKTGoBFH4.webp',
            'image_5' => 'product/U7nnETNNdhRHALCEl0NC7GdSORREmXdceIXUR2bB.webp'
        ]);
        Product::updateOrCreate([
            'id_category' => 1,
            'id_admin' => 1,
            'name' => 'GPU Galaxyon X',
            'price' => 1350000,
            'description' => 'Para testemunhar a verdadeira imponência do universo digital, você precisa de um motor gráfico sem precedentes. A Galaxion X GPU combina uma arquitetura de renderização quântica com um sistema de refrigeração líquida integrada por plasma, projetada para esmagar qualquer barreira de resolução. Seja para processar simulações massivas de inteligência artificial ou para rodar os jogos mais exigentes do universo com Ray Tracing total e latência zero, ela entrega o poder visual definitivo.',
            'details' => 'Arquitetura de Renderização Hiperespaço, Memória de Próxima Geração (32 GB GDDR7), Bloco de Resfriamento Líquido Integrado, Display Holográfico de Núcleo, Iluminação Sincronizada Chroma-Galáctica, Interface de Conexão, Suporte a Tecnologias Avançadas, Alimentação Estabilizada',
            'stock' => '5',
            'image' => 'product/5gtT4utIML2N1EcpJxlSUwi35ThXROtVq1KSsMpg.jpg',
            'image_2' => '',
            'image_3' => '',
            'image_4' => '',
            'image_5' => ''
        ]);
        Product::updateOrCreate([
            'id_category' => 2,
            'id_admin' => 1,
            'name' => 'Processador Galaxyon X',
            'price' => 800000,
            'description' => 'Prepare-se para transcender os limites da computação convencional. O Galaxion X Processor não é apenas uma CPU; é um reator quântico encapsulado, desenvolvido com engenharia reversa de tecnologia alienígena e alimentado por pura energia estelar. Projetado especificamente para lidar com as cargas de trabalho mais extremas do universo e garantir a vitória nas batalhas digitais mais épicas, ele redefine o significado de poder de processamento.',
            'details' => 'Núcleos Quantum-Operais, Interconexão de Fusão, Cache Nível Astro: Equipado com impressionantes 1 GB de Cache L3/L4 integrado., Overclock Dinâmico até 8.0 GHz, Iluminação de Célula Galáctica 360°, TDP Máximo 350W, Proteção Térmica',
            'stock' => '3',
            'image' => 'product/NPa0iblmK2VIdpLA40ZvMkPNLwS0fmEJSERJlyGx.jpg',
            'image_2' => '',
            'image_3' => '',
            'image_4' => '',
            'image_5' => ''
        ]);
        Product::updateOrCreate([
            'id_category' => 3,
            'id_admin' => 1,
            'name' => 'RAM Galaxyon X',
            'price' => 400000,
            'description' => 'Para que um reator quântico e uma GPU de escala cósmica funcionem sem interrupções, as informações precisam viajar mais rápido que a luz. A Galaxion X RAM redefine os limites de largura de banda e latência, oferecendo uma velocidade de resposta instantânea para as tarefas mais brutais do universo. Forjada com chips de silício estelar selecionados à mão e blindada contra calor extremo, ela é o combustível que faltava para eliminar qualquer gargalo do seu sistema.',
            'details' => 'Núcleos de Velocidade Hiperlumínica, Capacidade Nebula Core de 128 GB, Dissipação de Calor de Plasma Quântico, Latência CAS Ultra-Baixa, Iluminação Galáctica Chroma 360°, Arquitetura de Dados de Alta Velocidade, Suporte a Múltiplos Perfis XMP / EXPO, Alimentação Estabilizada',
            'stock' => '20',
            'image' => 'product/eKflmT2Lc3lrVegCXVCfVl4Wb6Tc09dXJs5a6cZA.jpg',
            'image_2' => '',
            'image_3' => '',
            'image_4' => '',
            'image_5' => ''
        ]);
        Product::updateOrCreate([
            'id_category' => 4,
            'id_admin' => 1,
            'name' => 'SSD Galaxyon X',
            'price' => 450000,
            'description' => 'Telas de carregamento são uma limitação do passado. O Galaxion X SSD foi desenvolvido para teleportar seus arquivos, jogos e sistemas operacionais instantaneamente para a memória ativa. Utilizando as conexões mais velozes já mapeadas e células de memória de densidade molecular, este dispositivo de armazenamento oferece taxas de transferência absurdas, garantindo que o seu ecossistema nunca precise esperar por um bit sequer.',
            'details' => 'Velocidade de Leitura Hiperlumínica, Tecnologia de Reatores de Dados, , Capacidade Estelar de 4 TB, Dissipação de Calor de Plasma Quântico, Durabilidade Galáctica Extended, Compatibilidade Avançada, Display Auxiliar de Status, Suporte a Sistemas Galácticos',
            'stock' => '7',
            'image' => 'product/VHCq9RTuLpw5aS8NF1ZtS7XRhIwpO2BDDbTkmpUD.jpg',
            'image_2' => '',
            'image_3' => '',
            'image_4' => '',
            'image_5' => ''
        ]);
        Product::updateOrCreate([
            'id_category' => 5,
            'id_admin' => 1,
            'name' => 'Cooler supreme Galaxyon X',
            'price' => 1000000,
            'description' => 'Um cooler gamer lendário de nível cósmico, construído com tecnologia de uma civilização intergaláctica avançada. Sua estrutura é composta por titânio negro escovado e ligas metálicas futuristas, com design agressivo e industrial. No centro existe um reator de energia estelar encapsulado em um cilindro de cristal transparente, irradiando intensos brilhos roxos, azuis e magentas.Duas gigantescas ventoinhas RGB ocupam as laterais do cooler. As pás parecem feitas de energia condensada e exibem o efeito visual de uma galáxia girando dentro delas. Raios elétricos percorrem o núcleo enquanto tubos de refrigeração líquida transparentes transportam um fluido luminoso semelhante a plasma cósmico. Ao fundo, uma imensa nebulosa roxa e azul ilumina o ambiente espacial. Um buraco negro supermassivo com disco de acreção brilhante domina o horizonte, enquanto asteroides e partículas cósmicas flutuam ao redor. A iluminação é cinematográfica, com reflexos realistas, sombras profundas e efeitos de ray tracing avançado.',
            'details' => 'Ventoinhas de 140 mm com efeito de galáxia viva, Núcleo de fusão estelar visível., Sistema de refrigeração líquida com plasma energético., Estrutura em titânio negro e carbono forjado., Iluminação RGB cósmica dinâmica.,  Anéis gravitacionais flutuantes., Tecnologia alienígena avançada., Atmosfera épica de ficção científica., Ultra detalhado., Hiper-realista., Qualidade 16K., Unreal Engine 5., Octane Render., Concept Art AAA., Produto premium de luxo para gamers extremos.',
            'stock' => '4',
            'image' => 'product/K68sp2pTuGnNGknU4eJBHL4ChuiO0i6GVyDjyqCK.jpg',
            'image_2' => '',
            'image_3' => '',
            'image_4' => '',
            'image_5' => ''
        ]);
        Product::updateOrCreate([
            'id_category' => 6,
            'id_admin' => 1,
            'name' => 'Fonte Galaxyon X',
            'price' => 2000000,
            'description' => 'Para alimentar um ecossistema composto por reatores quânticos, memórias hiperlumínicas e GPUs de escala cósmica, você não pode confiar em uma corrente elétrica comum. A Galaxion X Power Supply é o gerador definitivo, projetado para fundir, estabilizar e distribuir energia pura com eficiência cirúrgica. Com uma blindagem digna de uma nave estelar, ela garante que seu setup permaneça indestrutível e perfeitamente energizado mesmo sob as cargas de overclock mais brutais do universo.',
            'details' => 'Conversor de Energia Estelar (1600W Brutos), Certificação Galáctica 95+ Diamond, Cabos Modulares em Fibra de Carbono, Arrefecimento por Levitação Magnética,Monitoramento de Plasma Dinâmico,Capacitores Japoneses de Cristal 105°C,Pronta para o Padrão ATX 3.1 & PCIe 5.1,Pronta para o Padrão ATX 3.1 & PCIe 5.1',
            'stock' => '10',
            'image' => 'product/s7yWMQ6aB6ZCLwibiJRUdlsFQqbfZewLe7B5teWQ.jpg',
            'image_2' => '',
            'image_3' => '',
            'image_4' => '',
            'image_5' => ''
        ]);
        Product::updateOrCreate([
            'id_category' => 7,
            'id_admin' => 1,
            'name' => 'Gabinete Galaxyon X',
            'price' => 300000,
            'description' => 'Nenhuma tecnologia alienígena ou componente de fusão estelar estaria seguro em uma carcaça comum. O Galaxion X Ultimate Chassis é a armadura definitiva para o seu ecossistema de hardware. Projetado com uma estética sci-fi agressiva e ângulos que desafiam a física tradicional, este gabinete não apenas protege seus componentes, mas atua como um otimizador de fluxo de ar e energia, transformando o seu quarto no centro de comando de uma nave capitânia.',
            'details' => 'Estrutura Armada de Titânio & Carbono, Janelas de Cristal de Quartzo (Vista 360°), Alto Fluxo de Ar Galáctico, Expansão de Núcleo Integrada,Iluminação de Próxima Geração,Fator de Forma Amplo,Espaço para Múltiplas GPUs,Suporte Massivo a Radiadores',
            'stock' => '10',
            'image' => 'product/Lqi6hdgyDX5QyJoOBx39mOGMg3HarGzrojGEc0Ly.jpg',
            'image_2' => '',
            'image_3' => '',
            'image_4' => '',
            'image_5' => ''
        ]);
        Product::updateOrCreate([
            'id_category' => 8,
            'id_admin' => 1,
            'name' => 'Keyboard Galaxyon X',
            'price' => 800000,
            'description' => 'Para dominar as galáxias e vencer batalhas em frações de segundo, sua resposta precisa ser instantânea. O Galaxion X Keyboard combina a precisão militar aeroespacial com o visual hipnotizante das nebulosas profundas. Cada tecla é um gatilho de alta tecnologia projetado para oferecer feedback perfeito, enquanto sua estrutura blindada garante que ele resista até mesmo aos momentos de maior tensão no campo de batalha.',
            'details' => 'Construção Forjada de Carbono e Titânio, Switches Galático-Operais (G-Op), Keycaps com Padrão Nebula Aurelia, Iluminação Chroma-Galáctica 360°,Receptor Nano-Chassis Incluso,Tri-Mode Wireless,Anti-Ghosting de 100% (N-Key Rollover),Compatibilidade Universal',
            'stock' => '10',
            'image' => 'product/JJYkCeUiTCf9vFtUHRWu91c3gcmZAqz9PbTt8bv3.jpg',
            'image_2' => '',
            'image_3' => '',
            'image_4' => '',
            'image_5' => ''
        ]);
        Product::updateOrCreate([
            'id_category' => 9,
            'id_admin' => 1,
            'name' => 'Mouse Galaxyon X',
            'price' => 900000,
            'description' => 'Um mouse gamer futurista extremamente avançado, inspirado em tecnologia alienígena e exploração espacial. Estrutura angular e agressiva em metal preto fosco com detalhes translúcidos revelando uma galáxia viva dentro do dispositivo. Iluminação RGB roxa, azul e magenta brilhando intensamente pelas laterais e pela roda de scroll. Logo holográfico em forma de espiral galáctica na parte superior. O mouse está pousado sobre um terreno rochoso de um planeta distante, cercado por asteroides, nebulosas coloridas e um gigantesco buraco negro luminoso ao fundo. Atmosfera cinematográfica, iluminação dramática, reflexos realistas, partículas cósmicas flutuando, ultra detalhado, hiper-realista, qualidade 8K, ray tracing, estilo de propaganda premium de produto gamer, profundidade de campo profissional, visual digno de ficção científica AAA.',
            'details' => 'Sensor óptico de 50.000 DPI., Peso ultraleve de 45g., Laterais com efeito de energia cósmica pulsante., Botões mecânicos com luz própria.,Sistema de refrigeração futurista,Base magnética antigravidade.,Cabos de energia azul elétrica atravessando o interior transparente.,Pequenos fragmentos de estrelas orbitando o mouse.',
            'stock' => '10',
            'image' => 'product/VwjAdI2C8UXyEHDGVd5MXCZHXsinNo3iS5sCH0ON.jpg',
            'image_2' => '',
            'image_3' => '',
            'image_4' => '',
            'image_5' => ''
        ]);
        Product::updateOrCreate([
            'id_category' => 10,
            'id_admin' => 1,
            'name' => 'Placa mãe Galaxyon X',
            'price' => 1300000,
            'description' => 'Para sustentar o poder de um reator estelar, você precisa de uma fundação indestrutível. A Galaxion X Motherboard é a espinha dorsal definitiva para o seu setup, forjada com materiais aeroespaciais e circuitos de última geração. Desenvolvida para canalizar energia alienígena com estabilidade absoluta, ela garante que cada componente do seu sistema opere em desempenho máximo, mesmo durante as batalhas virtuais mais intensas e prolongadas.',
            'details' => 'Chassis Forjado de Carbono e Titânio, VRMs Galático-Operais (24+2 Fases), Slots M.2 com Resfriamento Nebula Aurelia, Iluminação Chroma-Galáctica 360°,Canais de Líquido Integrados,Suporte a Múltiplas GPUs e SSDs,Conectividade Espacial',
            'stock' => '10',
            'image' => 'product/X5n03PB5XFw54k5UOjxYDZ63pkJnZGw1NXCqM1XG.jpg',
            'image_2' => '',
            'image_3' => '',
            'image_4' => '',
            'image_5' => ''
        ]);
    }
}
