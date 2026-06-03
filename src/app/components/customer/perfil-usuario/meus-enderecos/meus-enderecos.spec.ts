import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MeusEnderecosComponent } from './meus-enderecos';

describe('MeusEnderecosComponent', () => {
  let component: MeusEnderecosComponent;
  let fixture: ComponentFixture<MeusEnderecosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MeusEnderecosComponent,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MeusEnderecosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});