import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscolherPredio } from './escolher-predio';

describe('EscolherPredio', () => {
  let component: EscolherPredio;
  let fixture: ComponentFixture<EscolherPredio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscolherPredio],
    }).compileComponents();

    fixture = TestBed.createComponent(EscolherPredio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
