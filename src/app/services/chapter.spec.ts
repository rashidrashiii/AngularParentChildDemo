import { TestBed } from '@angular/core/testing';

import { Chapter } from './chapter';

describe('Chapter', () => {
  let service: Chapter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Chapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
