import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {UserAccountService} from "../services/user-account.service";

@Injectable()
export class LandingPageResolverService implements Resolve<any> {
	userAccountService: UserAccountService;

	constructor(userAccountService: UserAccountService) {
		this.userAccountService = userAccountService;
	}

	resolve(route: ActivatedRouteSnapshot) {
		let that = this;

		return new Promise((resolve, reject) => {
			this.userAccountService.adminCheckStateChange$.subscribe(
				adminCheck => {
					if (!this.userAccountService.isAdminCheckInitialized) {
						this.userAccountService.initializeAdminCheck({showBusyIndicator: true});
					}
					if (!this.userAccountService.isProfileDetailsInitialized) {
						this.userAccountService.initializeProfileDetails({showBusyIndicator: true});
					}

					if (this.userAccountService.isAdminCheckInitialized && this.userAccountService.isProfileDetailsInitialized) {
						resolve(adminCheck);
					}
				});

			this.userAccountService.profileDetailsStateChange$.subscribe(
				profileDetails => {
					if (!this.userAccountService.isAdminCheckInitialized) {
						this.userAccountService.initializeAdminCheck({showBusyIndicator: true});
					}
					if (!this.userAccountService.isProfileDetailsInitialized) {
						this.userAccountService.initializeProfileDetails({showBusyIndicator: true});
					}

					if (this.userAccountService.isAdminCheckInitialized && this.userAccountService.isProfileDetailsInitialized) {
						resolve(profileDetails);
					}
				});
		});
	}
}

