import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCarrinho } from './card-carrinho';

describe('CardCarrinho', () => {
  let component: CardCarrinho;
  let fixture: ComponentFixture<CardCarrinho>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCarrinho]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCarrinho);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
