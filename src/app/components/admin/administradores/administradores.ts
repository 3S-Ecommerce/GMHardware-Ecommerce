import { Component, inject, OnInit, signal } from '@angular/core';
import { Admin } from '../../../core/services/admin';

@Component({
  selector: 'app-administradores',
  imports: [],
  templateUrl: './administradores.html',
  styleUrl: './administradores.scss',
})
export class Administradores implements OnInit{

  private apiAdmin = inject(Admin);
  admins = signal<any>(null);

  ngOnInit(): void {
    this.apiAdmin.getAdmin('').subscribe({
      next: (data) => {
        this.admins.set(data);
      },
      error: (err) => {
        console.error("Error: ", err);
      }
    })
  }
}
