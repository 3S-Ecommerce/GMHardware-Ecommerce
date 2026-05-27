import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusCartoes } from './meus-cartoes';

describe('MeusCartoes', () => {
  let component: MeusCartoes;
  let fixture: ComponentFixture<MeusCartoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeusCartoes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeusCartoes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
