import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationOverview } from './communication-overview';

describe('CommunicationOverview', () => {
  let component: CommunicationOverview;
  let fixture: ComponentFixture<CommunicationOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunicationOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunicationOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
