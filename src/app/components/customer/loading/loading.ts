import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-loading',
  imports: [],
  templateUrl: './loading.html',
  styleUrl: './loading.scss',
})
export class Loading {
static isLoading = signal(false);
isLoading = Loading.isLoading;
// // No seu componente, por exemplo, visualizar-produto.ts
// mostrarLoading() {
//   document.getElementById('loader')!.style.display = 'flex';
// }

// esconderLoading() {
//   document.getElementById('loader')!.style.display = 'none';
//   // document.getElementById('loader')!.style.backgroundColor = '#FFFFFF00';
// }

}
