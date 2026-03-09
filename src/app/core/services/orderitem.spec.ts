import { TestBed } from '@angular/core/testing';

import { Orderitem } from './orderitem';

describe('Orderitem', () => {
  let service: Orderitem;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Orderitem);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
