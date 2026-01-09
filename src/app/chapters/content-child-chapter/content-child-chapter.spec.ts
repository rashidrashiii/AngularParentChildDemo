import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentChildChapter } from './content-child-chapter';

describe('ContentChildChapter', () => {
  let component: ContentChildChapter;
  let fixture: ComponentFixture<ContentChildChapter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentChildChapter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentChildChapter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
