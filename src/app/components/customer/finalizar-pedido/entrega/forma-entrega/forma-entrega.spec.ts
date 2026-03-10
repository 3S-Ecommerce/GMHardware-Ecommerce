import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaEntrega } from './forma-entrega';

describe('FormaEntrega', () => {
  let component: FormaEntrega;
  let fixture: ComponentFixture<FormaEntrega>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormaEntrega]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormaEntrega);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
