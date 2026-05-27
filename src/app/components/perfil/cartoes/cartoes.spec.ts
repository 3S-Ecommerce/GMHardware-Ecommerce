import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cartoes } from './cartoes';

describe('Cartoes', () => {
  let component: Cartoes;
  let fixture: ComponentFixture<Cartoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cartoes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cartoes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
