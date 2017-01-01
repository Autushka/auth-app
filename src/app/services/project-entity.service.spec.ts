/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProjectEntityService } from './project-entity.service';
import { GlobalsService } from './globals.service';
import { UserAccountService } from './user-account.service';

describe('Service: ProjectEntity', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectEntityService, GlobalsService, UserAccountService]
    });
  });

  it('should ...', inject([ProjectEntityService], (service: ProjectEntityService) => {
    expect(service).toBeTruthy();
  }));
});
