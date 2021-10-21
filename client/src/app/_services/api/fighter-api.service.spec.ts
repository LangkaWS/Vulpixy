import { TestBed } from '@angular/core/testing';

import { FighterApiService } from './fighter-api.service';

describe('FighterApiService', () => {
  let service: FighterApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FighterApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
