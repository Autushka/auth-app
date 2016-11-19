/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProjectEntityService } from './project-entity.service';

describe('Service: ProjectEntity', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectEntityService]
    });
  });

  it('should ...', inject([ProjectEntityService], (service: ProjectEntityService) => {
    expect(service).toBeTruthy();
  }));
});
