import { Component, computed, inject, signal } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Product } from '../../core/services/product';
import { Category } from '../../core/services/category';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../core/services/user';
import { Order } from '../../core/services/order';
import { Orderitem } from '../../core/services/orderitem';

@Component({
  selector: 'app-test-read',
  standalone: true,
  imports: [Header, Footer, ReactiveFormsModule],
  templateUrl: './test-read.html',
  styleUrl: './test-read.scss',
})
export class TestRead {
  apiProduct = inject(Product);
  apiCategory = inject(Category); 
  apiUser = inject(User);
  apiOrder = inject(Order);
  apiOrderItem = inject(Orderitem);

  dados = signal<any>(null);
  uniq = signal<boolean>(false)
  private formBuilder = inject(FormBuilder);

  formId = this.formBuilder.group({
    id: [''],
    opcao: ['', Validators.required],
  })

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
            if(id){
              this.uniq.set(true)
              console.log('teste')
            }
            else{
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
            if(id){
              this.uniq.set(true)
              console.log('teste')
            }
            else{
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
            if(id){
              this.uniq.set(true)
              console.log('teste')
            }
            else{
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
            if(id){
              this.uniq.set(true)
              console.log('teste')
            }
            else{
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
            if(id){
              this.uniq.set(true)
              console.log('teste')
            }
            else{
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
