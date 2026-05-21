import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioPendencias } from './relatorio-pendencias';

describe('RelatorioPendencias', () => {
  let component: RelatorioPendencias;
  let fixture: ComponentFixture<RelatorioPendencias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioPendencias],
    }).compileComponents();

    fixture = TestBed.createComponent(RelatorioPendencias);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
