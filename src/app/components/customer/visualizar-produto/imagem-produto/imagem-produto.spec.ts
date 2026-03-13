import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagemProduto } from './imagem-produto';

describe('ImagemProduto', () => {
  let component: ImagemProduto;
  let fixture: ComponentFixture<ImagemProduto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagemProduto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagemProduto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
