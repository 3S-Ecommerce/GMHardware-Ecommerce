import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagamentoConcluido } from './pagamento-concluido';

describe('PagamentoConcluido', () => {
  let component: PagamentoConcluido;
  let fixture: ComponentFixture<PagamentoConcluido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagamentoConcluido]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagamentoConcluido);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
