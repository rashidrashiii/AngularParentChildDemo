import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Exercises } from './exercises';

describe('Exercises', () => {
  let component: Exercises;
  let fixture: ComponentFixture<Exercises>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Exercises]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Exercises);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
