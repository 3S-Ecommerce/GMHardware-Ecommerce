import { Component, inject, signal, OnInit} from '@angular/core';
import { Admin } from '../../../../core/services/admin';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-geral',
  imports: [DatePipe, RouterLink],
  templateUrl: './geral.html',
  styleUrl: './geral.scss',
})
export class Geral implements OnInit {

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
