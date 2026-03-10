import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Escolher } from './escolher';

describe('Escolher', () => {
  let component: Escolher;
  let fixture: ComponentFixture<Escolher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Escolher]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Escolher);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
