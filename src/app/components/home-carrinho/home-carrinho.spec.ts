import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCarrinho } from './home-carrinho';

describe('HomeCarrinho', () => {
  let component: HomeCarrinho;
  let fixture: ComponentFixture<HomeCarrinho>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCarrinho]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCarrinho);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
