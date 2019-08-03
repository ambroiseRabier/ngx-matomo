import { TestBed } from '@angular/core/testing';

import { MatomoTracker } from './matomo-tracker.service';

describe('MatomoTracker', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatomoTracker = TestBed.get(MatomoTracker);
    expect(service).toBeTruthy();
  });
});
