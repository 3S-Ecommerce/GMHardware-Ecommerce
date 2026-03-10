import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarProduto } from './adicionar-produto';

describe('AdicionarProduto', () => {
  let component: AdicionarProduto;
  let fixture: ComponentFixture<AdicionarProduto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarProduto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarProduto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
