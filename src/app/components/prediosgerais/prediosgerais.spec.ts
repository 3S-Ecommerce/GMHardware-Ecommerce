import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Prediosgerais } from './prediosgerais';

describe('Prediosgerais', () => {
  let component: Prediosgerais;
  let fixture: ComponentFixture<Prediosgerais>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Prediosgerais],
    }).compileComponents();

    fixture = TestBed.createComponent(Prediosgerais);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
