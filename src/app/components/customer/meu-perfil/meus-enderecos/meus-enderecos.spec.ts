import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusEnderecos } from './meus-enderecos';

describe('MeusEnderecos', () => {
  let component: MeusEnderecos;
  let fixture: ComponentFixture<MeusEnderecos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeusEnderecos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeusEnderecos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
