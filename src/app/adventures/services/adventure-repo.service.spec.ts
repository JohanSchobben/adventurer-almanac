import { TestBed } from '@angular/core/testing';

import { AdventureRepoService } from './adventure-repo.service';

describe('AdventureRepoService', () => {
  let service: AdventureRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdventureRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
