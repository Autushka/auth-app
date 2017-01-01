import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {ProjectEntityService} from "../services/project-entity.service";
import {InvitationService} from "../services/invitation.service";
import {UserAccountService} from "../services/user-account.service";

@Injectable()
export class InvitationListResolverService  implements Resolve<any> {
	invitationService: InvitationService;
	userAccountService: UserAccountService;

	constructor(invitationService: InvitationService, userAccountService: UserAccountService) {
		this.invitationService = invitationService;
		this.userAccountService = userAccountService;
	}

	resolve(route: ActivatedRouteSnapshot) {
		let that = this;
		let email = '';

		this.userAccountService.profileDetailsStateChange$.subscribe(
			profileDetails => {
				email = profileDetails.email;
			});



		return new Promise((resolve, reject) => {
			this.invitationService.invitationListStateChange$.subscribe(
				invitationList => {

					if(!this.invitationService.isInvitationListInitialized){
						this.invitationService.initializeInvitationList(email, {showBusyIndicator: true});
					}else{
						resolve(invitationList);
					}
				});
		});
	}
}

