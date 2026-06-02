import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Garantia } from './garantia';

describe('Garantia', () => {
  let component: Garantia;
  let fixture: ComponentFixture<Garantia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Garantia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Garantia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
