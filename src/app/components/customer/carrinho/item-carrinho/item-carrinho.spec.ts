import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCarrinho } from './item-carrinho';

describe('ItemCarrinho', () => {
  let component: ItemCarrinho;
  let fixture: ComponentFixture<ItemCarrinho>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemCarrinho]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemCarrinho);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
