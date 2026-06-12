import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Product } from '../../../core/services/product';
import { Category } from '../../../core/services/category';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../core/services/user';
import { Order } from '../../../core/services/order';
import { Orderitem } from '../../../core/services/orderitem';

@Component({
  selector: 'app-test-read',
  standalone: true,
  imports: [Header, Footer, ReactiveFormsModule, FormsModule],
  templateUrl: './test-read.html',
  styleUrl: './test-read.scss',
})
export class TestRead implements OnInit {
  apiProduct = inject(Product);
  apiCategory = inject(Category);
  apiUser = inject(User);
  apiOrder = inject(Order);
  apiOrderItem = inject(Orderitem);
  numero?: number;
  string?: string;
  dados = signal<any>(null);
  uniq = signal<boolean>(false)
  private formBuilder = inject(FormBuilder);

  formId = this.formBuilder.group({
    id: [''],
    opcao: ['', Validators.required],
  })

  formTeste = this.formBuilder.group({
    string: [''],
    number: ['']
  })

  usuario = {
    cpf: '',
    data: ''
  }

  ngOnInit(): void {
    this.formTeste.get('number')?.valueChanges.subscribe(valor => {
      if (!valor) return

      let numeros = valor.replace(/\D/g, '');

      if (numeros.length > 16)
        numeros = numeros.substring(0, 16)

      const valorFormat = numeros.match(/.{1,4}/g)?.join(' ') || '';

      this.formTeste.get('number')?.patchValue(valorFormat, { emitEvent: false })
      console.log(this.formTeste.get('number')?.value)
    })
  }

  onCpfChange(valor: string, innerHTML: HTMLInputElement) {
    if (!valor) return

    let cpf = valor.replace(/\D/g, '');
    if (cpf.length > 11) {
      cpf = cpf.substring(0, 11)
    }
    
    const cpfFormatado = cpf
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')

    this.usuario.cpf = cpfFormatado

    innerHTML.value = cpfFormatado
  }

  onSubmit3() {
    console.log(this.usuario)
  }

  onSubmit2() {
    const numero = this.formTeste.get('number')?.value?.replace(/\D/g, '');
    const texto = this.formTeste.get('string')?.value;

    if (numero?.length != 16)
      console.error("Verifique os dados do cartão")
    else
      console.log("O numero do seu cartão é: "+ numero.match(/.{1,4}/g)?.join(' '))
    if (texto != undefined)
      if (texto?.length <= 3)
        console.error("Insira seu nome")

    else
      console.log("Seu nome é: "+ texto)
  }

  onSubmit() {
    const formData = new FormData;
    const id = this.formId.value.id;

    Object.entries(this.formId.value).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value as string)
      }
    })
    switch (this.formId.value.opcao) {
      case ('category'):
        this.apiCategory.getCategory(`${id}`).subscribe({
          next: (data) => {
            console.log(data);
            this.dados.set(data);
            if (id) {
              this.uniq.set(true)
              console.log('teste')
            }
            else {
              this.uniq.set(false)
            }
          },
          error: (err) => {
            console.error("error: ", err)
          }
        })
        break
      case ('product'):
        this.apiProduct.getProduct(`${id}`).subscribe({
          next: (data) => {
            console.log(data);
            this.dados.set(data);
            if (id) {
              this.uniq.set(true)
              console.log('teste')
            }
            else {
              this.uniq.set(false)
            }
          },
          error: (err) => {
            console.error("error: ", err)
          }
        })
        break
      case ('user'):
        this.apiUser.getUser(`${id}`).subscribe({
          next: (data) => {
            console.log(data);
            this.dados.set(data);
            if (id) {
              this.uniq.set(true)
              console.log('teste')
            }
            else {
              this.uniq.set(false)
            }
          },
          error: (err) => {
            console.error("error: ", err)
          }
        })
        break
      case ('order'):
        this.apiOrder.getOrder(`${id}`).subscribe({
          next: (data) => {
            console.log(data);
            this.dados.set(data);
            if (id) {
              this.uniq.set(true)
              console.log('teste')
            }
            else {
              this.uniq.set(false)
            }
          },
          error: (err) => {
            console.error("error: ", err)
          }
        })
        break
      case ('orderitem'):
        this.apiOrderItem.getOrderItem(`${id}`).subscribe({
          next: (data) => {
            console.log(data);
            this.dados.set(data);
            if (id) {
              this.uniq.set(true)
              console.log('teste')
            }
            else {
              this.uniq.set(false)
            }
          },
          error: (err) => {
            console.error("error: ", err)
          }
        })
        break
    }

  }



}
