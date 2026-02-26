import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cartao } from './cartao';

describe('Cartao', () => {
  let component: Cartao;
  let fixture: ComponentFixture<Cartao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cartao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cartao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
