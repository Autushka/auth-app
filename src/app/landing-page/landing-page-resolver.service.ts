import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {SharedDataService} from "../shared-data.service";

@Injectable()
export class LandingPageResolverService  implements Resolve<any> {
	sharedDataService: SharedDataService;

	constructor(sharedDataService: SharedDataService) {
		this.sharedDataService = sharedDataService;
	}

	resolve(route: ActivatedRouteSnapshot) {
		let that = this;

		return new Promise((resolve, reject) => {
			this.sharedDataService.adminCheckStateChange$.subscribe(
				adminCheck => {
					if(!this.sharedDataService.isAdminCheckInitialized){
						this.sharedDataService.initializeAdminCheck({showBusyIndicator: true});
					}else{
						resolve(adminCheck);
					}
				});
		});
	}
}

