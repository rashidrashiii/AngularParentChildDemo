import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildInput } from './child-input';

describe('ChildInput', () => {
  let component: ChildInput;
  let fixture: ComponentFixture<ChildInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
