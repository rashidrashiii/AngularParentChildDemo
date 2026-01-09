import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildOutput } from './child-output';

describe('ChildOutput', () => {
  let component: ChildOutput;
  let fixture: ComponentFixture<ChildOutput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildOutput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildOutput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
