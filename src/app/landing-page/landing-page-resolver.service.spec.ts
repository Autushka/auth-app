/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LandingPageResolverService } from './landing-page-resolver.service';

describe('Service: LandingPageResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LandingPageResolverService]
    });
  });

  it('should ...', inject([LandingPageResolverService], (service: LandingPageResolverService) => {
    expect(service).toBeTruthy();
  }));
});
