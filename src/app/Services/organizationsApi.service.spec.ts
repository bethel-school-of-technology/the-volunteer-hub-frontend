import { TestBed } from "@angular/core/testing";

import { OrganizationsApiService } from "./organizationsApi.service";

describe("OrganizationsApiService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: OrganizationsApiService = TestBed.get(
      OrganizationsApiService
    );
    expect(service).toBeTruthy();
  });
});
