import { Component } from '@angular/core';

@Component({
  selector: 'app-home-carrinho',
  imports: [],
  templateUrl: './home-carrinho.html',
  styleUrl: './home-carrinho.scss',
})
export class HomeCarrinho {

categoryList = ['Placa de vídeo','Processadores','Memórias RAM','SSDs','Gabinetes','Coolers','Fontes','Periféricos'
];
  productList = [
  { productId: 1, rating: 5, isOffer: true, productName: 'RTX 4060 8GB', category: 'Placa de vídeo', price: 2499, discount: 12, availableQty: 3, imageUrl: 'https://images.kabum.com.br/produtos/fotos/469132/placa-de-video-rtx-4060-ventus-2x-black-oc-msi-nvidia-geforce-8gb-gddr6-dlss-ray-tracing_1688052210_gg.jpg' },

  { productId: 2, rating: 4, isOffer: false, productName: 'RX 7600 8GB', category: 'Placa de vídeo', price: 2199, discount: 8, availableQty: 5, imageUrl: 'https://images7.kabum.com.br/produtos/fotos/475647/placa-de-video-rx-7600-gaming-oc-8g-radeon-gigabyte-8gb-gddr6-128bits-rgb-gv-r76gaming-oc-8gd_1698435450_gg.jpg' },

  { productId: 3, rating: 5, isOffer: true, productName: 'Ryzen 7 5800X', category: 'Processadores', price: 1899, discount: 10, availableQty: 6, imageUrl: 'https://m.media-amazon.com/images/I/51gRv8z+K6L._AC_SY879_.jpg' },

  { productId: 4, rating: 4, isOffer: false, productName: 'Core i5 13400F', category: 'Processadores', price: 1499, discount: 5, availableQty: 4, imageUrl: 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/b/x/bx8071513400f.jpg' },

  { productId: 5, rating: 5, isOffer: true, productName: '16GB DDR4 3200MHz', category: 'Memórias RAM', price: 329, discount: 10, availableQty: 12, imageUrl: 'https://m.media-amazon.com/images/I/61MYgWr+xWL._AC_SX679_.jpg' },

  { productId: 6, rating: 4, isOffer: false, productName: '32GB DDR5 5600MHz', category: 'Memórias RAM', price: 899, discount: 7, availableQty: 7, imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_867480-MLB75302188216_032024-F.webp' },

  { productId: 7, rating: 5, isOffer: true, productName: 'SSD NVMe 1TB Gen4', category: 'SSDs', price: 499, discount: 20, availableQty: 10, imageUrl: 'https://cdn.awsli.com.br/600x1000/2557/2557636/produto/248634990/ssd-1tb-corsair-mp600-pro-nh-pcie-gen-4-0-x4-nvme-m-2-leitura-7000mb-s-e-gravaca-ve8si4eatp.jpg' },

  { productId: 8, rating: 4, isOffer: false, productName: 'SSD SATA 480GB', category: 'SSDs', price: 249, discount: 5, availableQty: 15, imageUrl: 'https://m.media-amazon.com/images/I/81zAE32yjaL._AC_SX679_.jpg' },

  { productId: 9, rating: 4, isOffer: true, productName: 'Gabinete Gamer RGB', category: 'Gabinetes', price: 349, discount: 10, availableQty: 9, imageUrl: 'https://m.media-amazon.com/images/I/61hoTiLMg1L._AC_SY300_SX300_QL70_ML2_.jpg' },

  { productId: 10, rating: 5, isOffer: false, productName: 'Water Cooler 240mm', category: 'Coolers', price: 599, discount: 15, availableQty: 6, imageUrl: 'https://images8.kabum.com.br/produtos/fotos/415798/water-cooler-nzxt-kraken-240-rgb-240mm-1-54in-display-rgb-controller-e-rgb-fans-preto-rl-kr240-b1_1686582320_gg.jpg' },

  { productId: 11, rating: 4, isOffer: true, productName: 'Fonte 650W 80 Plus Bronze', category: 'Fontes', price: 459, discount: 18, availableQty: 8, imageUrl: 'https://m.media-amazon.com/images/I/81eLlIQ5PsL._AC_SX679_.jpg' },

  { productId: 12, rating: 5, isOffer: false, productName: 'Teclado Mecânico RGB', category: 'Periféricos', price: 399, discount: 12, availableQty: 14, imageUrl: 'https://images.kabum.com.br/produtos/fotos/472044/teclado-mecanico-gamer-kbm-gaming-tg600-preto-60-e-abnt2-rgb-switch-gateron-blue-kgtg600ptaz_1709825263_gg.jpg' }
];


}
