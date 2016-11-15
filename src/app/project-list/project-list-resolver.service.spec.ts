/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProjectListResolverService } from './project-list-resolver.service';

describe('Service: ProjectListResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectListResolverService]
    });
  });

  it('should ...', inject([ProjectListResolverService], (service: ProjectListResolverService) => {
    expect(service).toBeTruthy();
  }));
});
