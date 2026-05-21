import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscolherCadastro } from './escolher-cadastro';

describe('EscolherCadastro', () => {
  let component: EscolherCadastro;
  let fixture: ComponentFixture<EscolherCadastro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscolherCadastro],
    }).compileComponents();

    fixture = TestBed.createComponent(EscolherCadastro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
