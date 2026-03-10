import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Revisar } from './revisar';

describe('Revisar', () => {
  let component: Revisar;
  let fixture: ComponentFixture<Revisar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Revisar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Revisar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
