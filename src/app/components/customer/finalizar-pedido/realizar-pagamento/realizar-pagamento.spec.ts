import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarPagamento } from './realizar-pagamento';

describe('RealizarPagamento', () => {
  let component: RealizarPagamento;
  let fixture: ComponentFixture<RealizarPagamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealizarPagamento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealizarPagamento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
