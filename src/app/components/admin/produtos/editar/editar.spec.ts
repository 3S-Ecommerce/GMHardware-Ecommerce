import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editarp } from './editar';

describe('Editar', () => {
  let component: Editarp;
  let fixture: ComponentFixture<Editarp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Editarp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Editarp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
