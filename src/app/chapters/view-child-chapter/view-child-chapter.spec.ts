import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChildChapter } from './view-child-chapter';

describe('ViewChildChapter', () => {
  let component: ViewChildChapter;
  let fixture: ComponentFixture<ViewChildChapter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewChildChapter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewChildChapter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
