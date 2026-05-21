import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisarPendencias } from './revisar-pendencias';

describe('RevisarPendencias', () => {
  let component: RevisarPendencias;
  let fixture: ComponentFixture<RevisarPendencias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevisarPendencias],
    }).compileComponents();

    fixture = TestBed.createComponent(RevisarPendencias);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
