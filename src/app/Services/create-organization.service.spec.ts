import { TestBed } from '@angular/core/testing';

import { CreateOrganizationService } from './create-organization.service';

describe('CreateOrganizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateOrganizationService = TestBed.get(CreateOrganizationService);
    expect(service).toBeTruthy();
  });
});
