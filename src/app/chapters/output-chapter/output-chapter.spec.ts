import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputChapter } from './output-chapter';

describe('OutputChapter', () => {
  let component: OutputChapter;
  let fixture: ComponentFixture<OutputChapter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutputChapter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutputChapter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
