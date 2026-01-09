import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildView } from './child-view';

describe('ChildView', () => {
  let component: ChildView;
  let fixture: ComponentFixture<ChildView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
