import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Apresentacao } from './apresentacao';

describe('Apresentacao', () => {
  let component: Apresentacao;
  let fixture: ComponentFixture<Apresentacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Apresentacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Apresentacao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
