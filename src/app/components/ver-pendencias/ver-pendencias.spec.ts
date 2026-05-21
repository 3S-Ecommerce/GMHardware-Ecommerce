import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPendencias } from './ver-pendencias';

describe('VerPendencias', () => {
  let component: VerPendencias;
  let fixture: ComponentFixture<VerPendencias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerPendencias],
    }).compileComponents();

    fixture = TestBed.createComponent(VerPendencias);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
