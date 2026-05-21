import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingEnvio } from './loading-envio';

describe('LoadingEnvio', () => {
  let component: LoadingEnvio;
  let fixture: ComponentFixture<LoadingEnvio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingEnvio],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingEnvio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
