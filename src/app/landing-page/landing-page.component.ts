import {Component, OnInit} from '@angular/core';
import {AngularFire} from "angularfire2";
import {Router} from "@angular/router";
import {UserAccountService} from "../services/user-account.service";
import {GlobalsService} from "../services/globals.service";
import {ProjectEntityService} from "../services/project-entity.service";
import {InvitationService} from "../services/invitation.service";

@Component({
	selector: 'app-landing-page',
	templateUrl: './landing-page.component.html',
	styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
	userAccountService: UserAccountService;
	globalsService: GlobalsService;
	projectEntityService: ProjectEntityService;
	invitationService: InvitationService;

	router: Router;
	af: AngularFire;

	constructor(af: AngularFire, router: Router, userAccountService: UserAccountService, globalsService: GlobalsService, projectEntityService: ProjectEntityService, invitationService: InvitationService) {
		this.af = af;
		this.router = router;
		this.userAccountService = userAccountService;
		this.globalsService = globalsService;
		this.projectEntityService = projectEntityService;
		this.invitationService = invitationService;
	}

	ngOnInit() {
	}

	onLogout() {
		this.userAccountService.initialize();
		this.globalsService.initialize();
		this.projectEntityService.initialize();
		this.invitationService.initialize();

		this.af.auth.logout();
		this.router.navigate(['/login']);
	}
}
