import { inject, TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ConfigVaultService } from "./configvault.service";

describe("ConfigVaultService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule],
      providers: [ConfigVaultService]
    });
  });

  it("should be created", inject(
    [ConfigVaultService],
    (service: ConfigVaultService) => {
      expect(service).toBeTruthy();
    }
  ));
});
