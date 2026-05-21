import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { Pendencia } from '../../../core/services/pendencias';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Predios } from '../../../core/services/predios';
import { HeaderService } from '../../../core/services/header-service';
import { Loading } from '../../loading/loading';

@Component({
  selector: 'app-pendencias',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, RouterLink, Loading],
  templateUrl: './pendencias.html',
  styleUrl: './pendencias.scss',
})
export class Pendencias implements OnInit {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private api = inject(Predios);
  private apiPend = inject(Pendencia)
  private route = inject(ActivatedRoute);
  private id = signal<number>(0);
  loading = signal<boolean>(true)
  elevadores = signal<any>(null);
  formPendencia = this.formBuilder.group({
    elevador_id: ['', Validators.required],
    priority: ['', Validators.required],
    location: ['', Validators.required],
    pendencia: ['', Validators.required]
  })

  constructor(private headerService: HeaderService){}

  ngOnInit(): void {
    this.headerService.setTitulo('CADASTRAR PENDENCIA')
    this.id.set(this.route.snapshot.params['id']);
    //console.log(this.id())
    this.api.getPredio(String(this.id()), 'elevadores').subscribe({
      next: (data) => {
        this.elevadores.set(data)
        this.elevadores.set(this.elevadores().elevadores)
        this.loading.set(false)
      },
      error: (err) => {

      }
    })
  }

  onSubmit() {
    const form = this.formPendencia.value;
    const formData = new FormData;
    formData.append('user_id', String(1))
    Object.entries(form).forEach(([key, value]) => {
      if(value != '' && value != undefined && value != null){
        formData.append(key, value as any);
      }
    })
    this.apiPend.createPendencia(formData).subscribe({
      next: (data) => {
        console.log(data)
        alert("Pendencia criada")
        this.router.navigate(['/cadastro'])
      },
      error: (err) => {
        console.error("Error: ",err)
      }
    })
  }
}