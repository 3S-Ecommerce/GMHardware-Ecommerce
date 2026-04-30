import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Devolucao } from './devolucao';

describe('Devolucao', () => {
  let component: Devolucao;
  let fixture: ComponentFixture<Devolucao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Devolucao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Devolucao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
