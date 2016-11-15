import {Component, OnInit} from '@angular/core';
import {AngularFire} from "angularfire2";
import {Router, ActivatedRoute} from "@angular/router";
import {SharedDataService} from "../shared-data.service";

@Component({
	selector: 'app-landing-page',
	templateUrl: './landing-page.component.html',
	styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
	sharedDataService: SharedDataService;
	router: Router;
	af: AngularFire;

	constructor(af: AngularFire, router: Router, sharedDataService: SharedDataService, activeRoute: ActivatedRoute) {
		this.af = af;
		this.router = router;
		this.sharedDataService = sharedDataService;

		this.sharedDataService.initializeProfileDetails({showBusyIndicator: false});
	}

	ngOnInit() {
	}

	onLogout() {
		this.sharedDataService.initializeSharedData();
		this.af.auth.logout();
		this.router.navigate(['/login']);
	}
}
