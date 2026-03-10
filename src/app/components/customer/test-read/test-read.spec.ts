import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRead } from './test-read';

describe('TestRead', () => {
  let component: TestRead;
  let fixture: ComponentFixture<TestRead>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestRead]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestRead);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
