import { TestBed } from '@angular/core/testing';

import { Pendencia } from './pendencias';

describe('Pendencias', () => {
  let service: Pendencia;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pendencia);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
