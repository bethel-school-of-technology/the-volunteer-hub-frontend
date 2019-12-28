import { TestBed } from '@angular/core/testing';

import { CreateOrgResolverService } from './create-org-resolver.service';

describe('CreateOrgResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateOrgResolverService = TestBed.get(CreateOrgResolverService);
    expect(service).toBeTruthy();
  });
});
