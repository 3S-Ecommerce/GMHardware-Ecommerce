import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosUsuario } from './dados-usuario';

describe('DadosUsuario', () => {
  let component: DadosUsuario;
  let fixture: ComponentFixture<DadosUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadosUsuario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DadosUsuario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
