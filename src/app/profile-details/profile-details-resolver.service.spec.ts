/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProfileDetailsResolverService } from './profile-details-resolver.service';

describe('Service: ProfileDetailsResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileDetailsResolverService]
    });
  });

  it('should ...', inject([ProfileDetailsResolverService], (service: ProfileDetailsResolverService) => {
    expect(service).toBeTruthy();
  }));
});
