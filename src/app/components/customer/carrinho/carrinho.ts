import { ItemCarrinho } from './item-carrinho/item-carrinho';
import { Component, inject, signal, OnInit, Input, computed } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router'; 
import { Product } from '../../../core/services/product';
import { Loading } from '../loading/loading';
import { Category } from '../../../core/services/category';


@Component({
  selector: 'app-carrinho',
  imports: [ItemCarrinho],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.scss',
})
export class Carrinho {


  



}


