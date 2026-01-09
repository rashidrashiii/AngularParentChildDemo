import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestPractices } from './best-practices';

describe('BestPractices', () => {
  let component: BestPractices;
  let fixture: ComponentFixture<BestPractices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestPractices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestPractices);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
