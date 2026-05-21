import { TestBed } from '@angular/core/testing';

import { Predios } from './predios';

describe('Predios', () => {
  let service: Predios;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Predios);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
