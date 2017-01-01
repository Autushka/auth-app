/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProjectDetailsResolverService } from './project-details-resolver.service';
import { ProjectEntityService } from '../services/project-entity.service';
import { GlobalsService } from '../services/globals.service';

describe('Service: ProjectDetailsResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectDetailsResolverService, ProjectEntityService, GlobalsService]
    });
  });

  it('should ...', inject([ProjectDetailsResolverService], (service: ProjectDetailsResolverService) => {
    expect(service).toBeTruthy();
  }));
});
