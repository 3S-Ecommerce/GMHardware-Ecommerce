import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Baselogin } from './baselogin';

describe('Baselogin', () => {
  let component: Baselogin;
  let fixture: ComponentFixture<Baselogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Baselogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Baselogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
