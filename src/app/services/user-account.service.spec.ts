/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserAccountService } from './user-account.service';
import { GlobalsService } from './globals.service';

describe('Service: UserAccount', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAccountService, GlobalsService]
    });
  });

  it('should ...', inject([UserAccountService], (service: UserAccountService) => {
    expect(service).toBeTruthy();
  }));
});
