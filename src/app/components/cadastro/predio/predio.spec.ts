import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Predio } from './predio';

describe('Predio', () => {
  let component: Predio;
  let fixture: ComponentFixture<Predio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Predio],
    }).compileComponents();

    fixture = TestBed.createComponent(Predio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
