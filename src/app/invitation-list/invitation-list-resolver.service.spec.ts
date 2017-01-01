/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InvitationListResolverService } from './invitation-list-resolver.service';

describe('InvitationListResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvitationListResolverService]
    });
  });

  it('should ...', inject([InvitationListResolverService], (service: InvitationListResolverService) => {
    expect(service).toBeTruthy();
  }));
});
