import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderService } from '../../../core/services/header-service';
import { NgOptimizedImage } from "@angular/common";
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Elevadores } from '../../../core/services/elevadores';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingEnvio } from '../../loading-envio/loading-envio';

@Component({
  selector: 'app-elevador',
  imports: [NgOptimizedImage, ReactiveFormsModule, LoadingEnvio],
  templateUrl: './elevador.html',
  styleUrl: './elevador.scss',
})
export class Elevador implements OnInit {
  private router = inject(Router);
  private formBuilder = new FormBuilder;
  private api = inject(Elevadores);
  private route = inject(ActivatedRoute);
  private id = this.route.snapshot.params['id'];
  increment = signal<number>(1);
  submitLoading = signal<boolean>(false);

  formElevador = this.formBuilder.group({
    number: this.formBuilder.array([])
  })

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.setTitulo('CADASTRAR EQUIPAMENTOS')
    this.novoElevador()
  }

  removerElevador() {
    this.numerosElevadores.removeAt(this.numerosElevadores.length - 1)
  }

  novoElevador() {
    this.numerosElevadores.push(new FormControl(''));
    this.increment.set(this.increment() + 1)
  }

  get numerosElevadores() {
    return this.formElevador.get('number') as FormArray
  }

  onSubmit() {
    this.submitLoading.set(true);
    const form = this.formElevador.value;

    // form.number?.forEach((num) => {
    //   const formData = new FormData;
    //   formData.append('predio_id', this.id);
    //   formData.append('number[]', String(num));
    //   this.api.createElevador(formData).subscribe({
    //     next: (data) => {
    //       console.log('Elevadores criados!');
    //     },
    //     error: (err) => {
    //       console.error('Error: ', err)
    //     }
    //   })
    // })
    if (form.number) {
      form.number.forEach((num: any) => {
        const formData = new FormData();

        formData.append('predio_id', String(this.id));
        formData.append('number', String(num));

        this.api.createElevador(formData).subscribe({
          next: (res) => console.log(`Elevador ${num} criado!`),
          error: (err) => console.error('Erro ao criar este elevador:', err)
        });
      });
      this.submitLoading.set(false);
      alert('Elevadores cadastrados!');
      this.router.navigate(['/cadastro']);
    }
  }
  // adicionar() {
  // const div = document.getElementById('numeros');
  // const input = document.createElement('input');
  // input.setAttribute('type', 'text');
  // input.setAttribute('placeholder', 'NUMERO DO EQUIPAMENTO');
  // input.setAttribute('_ngcontent-ng-c3602221620', '');
  // div?.appendChild(input)
  // }
}
