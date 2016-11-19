/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProjectDetailsResolverService } from './project-details-resolver.service';

describe('Service: ProjectDetailsResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectDetailsResolverService]
    });
  });

  it('should ...', inject([ProjectDetailsResolverService], (service: ProjectDetailsResolverService) => {
    expect(service).toBeTruthy();
  }));
});
