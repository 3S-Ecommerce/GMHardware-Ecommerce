import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Novop } from './novo';

describe('Novo', () => {
  let component: Novop;
  let fixture: ComponentFixture<Novop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Novop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Novop);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
