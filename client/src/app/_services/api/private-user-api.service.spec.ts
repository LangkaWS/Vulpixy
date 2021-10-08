import { TestBed } from '@angular/core/testing';

import { PrivateUserApiService } from './private-user-api.service';

describe('PrivateUserApiService', () => {
  let service: PrivateUserApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivateUserApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
