import { TestBed } from '@angular/core/testing';

import { NgxMatomoService } from './ngx-matomo.service';

describe('NgxMatomoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxMatomoService = TestBed.get(NgxMatomoService);
    expect(service).toBeTruthy();
  });
});
