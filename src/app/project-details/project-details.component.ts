import {Component, OnInit} from '@angular/core';
import {Router, Params, ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ProjectEntityService} from "../services/project-entity.service";
import {InvitationService} from "../services/invitation.service";
import {UserAccountService} from "../services/user-account.service";

@Component({
	selector: 'project-details',
	templateUrl: './project-details.component.html',
	styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
	projectDetails: ProjectDetails = {projectKey: '', projectName: '', currentUserRole: '', projectUsers: []};
	projectEntityService: ProjectEntityService;
	userAccountService: UserAccountService;
	invitationService: InvitationService;
	router: Router;
	route: ActivatedRoute;
	projectForm: FormGroup;

	projectKey: string;

	constructor(projectEntityService: ProjectEntityService, invitationService: InvitationService, userAccountService: UserAccountService,
					router: Router, fb: FormBuilder, route: ActivatedRoute,) {
		this.projectEntityService = projectEntityService;
		this.invitationService = invitationService;
		this.userAccountService = userAccountService;

		this.router = router;
		this.route = route;

		this.projectForm = fb.group({
			projectName: [null, Validators.required]
		});

	}

	ngOnInit() {
		let that = this;
		this.projectKey = this.route.snapshot.params['guid'];
		that.projectDetails.projectKey = this.projectKey;

		if (this.projectKey) {
			this.projectEntityService.projectDetailsStateChange$.subscribe(data => {
				that.projectDetails = data;
				that.projectForm.controls['projectName'].setValue(data.projectName);
			});
		}
	}

	onSubmit() {
		if (this.projectForm.valid) {
			this.projectDetails.projectName = this.projectForm.controls['projectName'].value;

			if (!this.projectKey) {
				this.projectEntityService.createProject(this.projectDetails);
			} else {
				this.projectEntityService.updateProject(this.projectDetails);
			}

			this.projectEntityService.isProjectDetailsInitialized = false;
			this.router.navigate(['/landing-page/project-list']);
		}
	}

	onBack() {
		this.projectEntityService.isProjectDetailsInitialized = false;
		this.router.navigate(['/landing-page/project-list']);
	}
}
