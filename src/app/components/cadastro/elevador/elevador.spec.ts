import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Elevador } from './elevador';

describe('Elevador', () => {
  let component: Elevador;
  let fixture: ComponentFixture<Elevador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Elevador],
    }).compileComponents();

    fixture = TestBed.createComponent(Elevador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
