import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {SharedDataService} from "../shared-data.service";

@Injectable()
export class ProfileDetailsResolverService  implements Resolve<any> {
	sharedDataService: SharedDataService;

  constructor(sharedDataService: SharedDataService) {
	  this.sharedDataService = sharedDataService;
  }

	resolve(route: ActivatedRouteSnapshot) {
		let that = this;

		return new Promise((resolve, reject) => {
			let profileDetails: ProfileDetails;

			this.sharedDataService.profileDetailsStateChange$.subscribe(
			  profileDetails => {
				  if(!this.sharedDataService.isProfileDetailsInitialized){
					  this.sharedDataService.initializeProfileDetails({showBusyIndicator: true});
				  }else{
					  resolve(profileDetails);
				  }
			  });
		});
	}
}

