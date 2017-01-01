import {Injectable} from '@angular/core';
import {UserAccountService} from "./user-account.service";
import * as firebase from 'firebase';
import {GlobalsService} from "./globals.service";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class InvitationService {
	invitationList: any;
	isInvitationListInitialized: boolean;
	invitationListSubscriber: any;
	invitationListStateChange$: any;


	userAccountService: UserAccountService;
	globalsService: GlobalsService;

	constructor(userAccountService: UserAccountService, globalsService: GlobalsService) {
		this.userAccountService = userAccountService;
		this.globalsService = globalsService;

		this.initialize();
	}

	changeInvitationListState(invitationList: any) {
		this.invitationList.next(invitationList);
	}

	initialize() {
		this.invitationList = new BehaviorSubject([]);
		this.isInvitationListInitialized = false;
		if (this.invitationListSubscriber) {
			this.invitationListSubscriber.unsubscribe();
		}

		this.invitationListStateChange$ = this.invitationList.asObservable();
	}

	createInvitation(invitationDetails: InvitationDetails) {
		let encodedSendToEmail = this.globalsService.firebaseCodec.encode(invitationDetails.sendToEmail);

		let invitationKey = this.userAccountService.af.database.list('/invitationsToEmail/' + encodedSendToEmail + '/projectAssignment/' + invitationDetails.projectKey + '/invitations').push({
			//projectId: invitationDetails.projectId,
			projectName: invitationDetails.projectName,
			status: 'pending',
			createdBy: this.userAccountService.profileDetailsSnapshot.fullName,
			createdAt: firebase.database.ServerValue.TIMESTAMP
		}).key;

		let roleObj = {};
		roleObj[invitationDetails.userRole] = true;
		this.userAccountService.af.database.object('/invitationsToEmail/' + encodedSendToEmail + '/projectAssignment/' + invitationDetails.projectKey + '/invitations/' + invitationKey + '/userRoles/' + invitationDetails.userRole).set(roleObj);
	}

	updateInvitationStatus(params: any){
		let encodedSendToEmail = this.globalsService.firebaseCodec.encode(this.userAccountService.profileDetailsSnapshot.email);

		this.userAccountService.af.database.list('/invitationsToEmail/' + encodedSendToEmail + '/projectAssignment/' + params.projectKey + '/invitations').update(params.invitationKey, {status: params.newStatus});
	}

	initializeInvitationList(email: string, params: FireBaseCallParams) {
		let that = this;
		let encodedEmail = this.globalsService.firebaseCodec.encode(email);
		if (params.showBusyIndicator) {
			this.globalsService.changeBusyIndicatorState(true);
		}

		this.userAccountService.af.database.list('/invitationsToEmail/' + encodedEmail + '/projectAssignment').subscribe(invitationsPerProject => {
			if (params.showBusyIndicator) {
				that.globalsService.changeBusyIndicatorState(false);
			}

			that.isInvitationListInitialized = true;
			that.changeInvitationListState(invitationsPerProject);
		});
	}
}
