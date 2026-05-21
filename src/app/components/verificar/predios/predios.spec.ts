import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Predios } from './predios';

describe('Predios', () => {
  let component: Predios;
  let fixture: ComponentFixture<Predios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Predios],
    }).compileComponents();

    fixture = TestBed.createComponent(Predios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
