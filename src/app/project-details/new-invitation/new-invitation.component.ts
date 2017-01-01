import {Component, OnInit, Input} from '@angular/core';
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {UserAccountService} from "../../services/user-account.service";
import {InvitationService} from "../../services/invitation.service";

@Component({
	selector: 'new-invitation',
	templateUrl: './new-invitation.component.html',
	styleUrls: ['./new-invitation.component.scss']
})
export class NewInvitationComponent implements OnInit {
	@Input() projectDetails: ProjectDetails;
	invitationForm: FormGroup;
	userRoles: any[] = [];
	userAccountService: UserAccountService;
	invitationService: InvitationService;

	constructor(fb: FormBuilder, userAccountService: UserAccountService, invitationService: InvitationService) {
		this.userAccountService = userAccountService;
		this.invitationService = invitationService;

		this.invitationForm = fb.group({
			sendToEmail: [null, Validators.required],
			userRole: [null, Validators.required]
		});
	}

	ngOnInit() {
		this.userRoles = this.userAccountService.getUserRoles();
		this.invitationForm.controls['userRole'].setValue('');
	}

	onSendInvitation() {
		if (this.invitationForm.valid) {
			let invitationDetails: InvitationDetails = {sendToEmail: '', projectKey: '', projectName: '', userRole: ''};
			invitationDetails.sendToEmail = this.invitationForm.controls['sendToEmail'].value;
			invitationDetails.projectKey = this.projectDetails.projectKey;
			invitationDetails.projectName = this.projectDetails.projectName;
			invitationDetails.userRole = this.invitationForm.controls['userRole'].value;

			this.invitationService.createInvitation(invitationDetails);
		}
	}

}
