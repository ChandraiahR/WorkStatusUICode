import { TestBed } from '@angular/core/testing';

import { WorkstatusserviceService } from './workstatusservice.service';

describe('WorkstatusserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkstatusserviceService = TestBed.get(WorkstatusserviceService);
    expect(service).toBeTruthy();
  });
});
