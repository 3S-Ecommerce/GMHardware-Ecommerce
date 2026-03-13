import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaisVendidos } from './mais-vendidos';

describe('MaisVendidos', () => {
  let component: MaisVendidos;
  let fixture: ComponentFixture<MaisVendidos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaisVendidos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaisVendidos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
