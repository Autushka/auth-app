import {Component, OnInit} from '@angular/core';
import {InvitationService} from "../services/invitation.service";
import {UserAccountService} from "../services/user-account.service";
import {GlobalsService} from "../services/globals.service";
import * as _ from 'lodash';
import {ProjectEntityService} from "../services/project-entity.service";

@Component({
	selector: 'app-invitation-list',
	templateUrl: './invitation-list.component.html',
	styleUrls: ['./invitation-list.component.scss']
})
export class InvitationListComponent implements OnInit {
	invitationService: InvitationService;
	userAccountService: UserAccountService;
	projectEntityService: ProjectEntityService;
	globalsService: GlobalsService;
	invitationList = [];

	constructor(invitationService: InvitationService, userAccountService: UserAccountService, globalsService: GlobalsService, projectEntityService: ProjectEntityService) {
		let that = this;
		this.invitationService = invitationService;
		this.userAccountService = userAccountService;
		this.globalsService = globalsService;
		this.projectEntityService = projectEntityService;

		this.invitationService.invitationListStateChange$.subscribe(
			invitationListPerProjects => {
				that.invitationList = [];
				_.forEach(invitationListPerProjects, function(invitationListPerProject){
					_.forEach(invitationListPerProject.invitations, function(invitation, invitationKey){
						let invitationObj = invitation;
						invitationObj.projectKey = invitationListPerProject.$key;
						invitationObj.invitationKey = invitationKey;

						if(invitationObj.status == 'pending'){
							that.invitationList.push(invitationObj);
						}
					});
				});
			});
	}

	ngOnInit() {
	}

	onAccept(i){
		this.projectEntityService.assignUserToProject({projectKey: this.invitationList[i].projectKey, userKey: this.userAccountService.auth.uid, userRole: _.keys(this.invitationList[i].userRoles)[0]});

		this.invitationService.updateInvitationStatus({newStatus: 'accepted', projectKey: this.invitationList[i].projectKey, invitationKey: this.invitationList[i].invitationKey});
	}

	onDecline(i){
		this.invitationService.updateInvitationStatus({newStatus: 'declined', projectKey: this.invitationList[i].projectKey, invitationKey: this.invitationList[i].invitationKey});
	}
}
