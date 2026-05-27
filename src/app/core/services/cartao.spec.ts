import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CartaoService } from './cartao'; // <-- Corrigido aqui

describe('CartaoService', ( ) => {
  let service: CartaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartaoService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(CartaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
