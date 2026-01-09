import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputChapter } from './input-chapter';

describe('InputChapter', () => {
  let component: InputChapter;
  let fixture: ComponentFixture<InputChapter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputChapter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputChapter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
