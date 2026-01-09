import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryChapter } from './summary-chapter';

describe('SummaryChapter', () => {
  let component: SummaryChapter;
  let fixture: ComponentFixture<SummaryChapter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryChapter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryChapter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
