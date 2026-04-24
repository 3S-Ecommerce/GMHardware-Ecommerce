import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Admin } from '../../../../core/services/admin';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar',
  imports: [ReactiveFormsModule],
  templateUrl: './editar.html',
  styleUrl: './editar.scss',
})
export class Editar implements OnInit {
  private readonly apiAdmin = inject(Admin);
  private route = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router)
  dados = signal<any>(null);

  formAdmin = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.email],
    password: [''],
    passwordsd: [''],
    phone_number: [''],
    document: [''],
    active: [true]
  }
  )

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.apiAdmin.getAdmin(id).subscribe({
      next: (data) => {
        this.dados.set(data);
        if (this.dados()) {
          this.formAdmin.patchValue({
            name: this.dados().name,
            email: this.dados().email,
            phone_number: this.dados().phone_number,
            // document: this.dados().document, É um dado privado na API
            active: this.dados().active
          })
          console.log(this.dados())
        }
      },
      error: (err) => {
        console.error("Error: ", err);
      }
    })
  }

  onSubmit() {
    const formData = new FormData;
    const admin = this.formAdmin.value;
    const id = String(this.route.snapshot.params['id']);
    if (admin.password || admin.passwordsd) {
      if(admin.password !== admin.passwordsd){
        return alert("As senhas não coincidem");
      }
    }
    delete admin.passwordsd
    Object.entries(admin).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        formData.append(key, value as any);
      }
    });
    formData.append('_method', 'PUT')
    this.apiAdmin.updateAdmin(formData, id).subscribe({
      next: (res) => {
        alert("Administrador atualizado com sucesso!");
        this.router.navigate(['/admin/administradores'])
      },
      error: (err) => {
        console.error('Error: ', err);
        alert("Erro ao atualizar administrador")
      }
    })
  }
  //   onSubmit() {
  //   const admin = this.formAdmin.value;
  //   const id = String(this.route.snapshot.params['id']);

  //   if (admin.password !== admin.passwordsd) {
  //     return alert("As senhas não coincidem");
  //   }

  //   // Em vez de FormData, enviamos o objeto direto
  //   this.apiAdmin.updateAdmin(admin, id).subscribe({
  //     next: (res) => {
  //       alert("Administrador atualizado com sucesso!");
  //       this.formAdmin.reset();
  //     },
  //     error: (err) => console.error(err)
  //   });
  // }
}
