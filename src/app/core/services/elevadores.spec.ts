import { TestBed } from '@angular/core/testing';

import { Elevadores } from './elevadores';

describe('Elevadores', () => {
  let service: Elevadores;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Elevadores);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
