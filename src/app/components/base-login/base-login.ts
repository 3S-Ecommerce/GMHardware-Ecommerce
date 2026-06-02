import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-base-login',
  imports: [RouterOutlet],
  templateUrl: './base-login.html',
  styleUrl: './base-login.scss',
})
export class BaseLogin implements OnInit{
  constructor(private title: Title){}
  ngOnInit(): void {
    this.title.setTitle('Login')
  }
}
