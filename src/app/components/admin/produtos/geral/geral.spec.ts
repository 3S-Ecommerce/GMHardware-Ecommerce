import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Geralp } from './geral';

describe('Geral', () => {
  let component: Geralp;
  let fixture: ComponentFixture<Geralp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Geralp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Geralp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
