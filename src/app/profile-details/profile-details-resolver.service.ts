import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {UserAccountService} from "../services/user-account.service";

@Injectable()
export class ProfileDetailsResolverService  implements Resolve<any> {
	userAccountService: UserAccountService;

  constructor(userAccountService: UserAccountService) {
	  this.userAccountService = userAccountService;
  }

	resolve(route: ActivatedRouteSnapshot) {
		let that = this;

		return new Promise((resolve, reject) => {
			let profileDetails: ProfileDetails;

			this.userAccountService.profileDetailsStateChange$.subscribe(
			  profileDetails => {
				  if(!this.userAccountService.isProfileDetailsInitialized){
					  this.userAccountService.initializeProfileDetails({showBusyIndicator: true});
				  }else{
					  resolve(profileDetails);
				  }
			  });
		});
	}
}

