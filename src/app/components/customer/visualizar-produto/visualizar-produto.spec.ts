import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarProduto } from './visualizar-produto';

describe('VisualizarProduto', () => {
  let component: VisualizarProduto;
  let fixture: ComponentFixture<VisualizarProduto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarProduto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarProduto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
