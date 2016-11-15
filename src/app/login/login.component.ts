import {Component, OnInit, ApplicationRef} from '@angular/core';
import {AngularFire} from "angularfire2";
import {SharedDataService} from "../shared-data.service";
import {Router} from "@angular/router";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	af: AngularFire;
	isBusyIndicatorShown: boolean;
	router: Router;

	constructor(af: AngularFire, sharedDataService: SharedDataService, router: Router,) {
		this.af = af;
		this.router = router;

		sharedDataService.busyIndicatorStateChange$.subscribe(
			isBusyIndicatorShown => {
				this.isBusyIndicatorShown = isBusyIndicatorShown;
			});
	}

	ngOnInit() {
	}

	onLogin() {
		this.af.auth.login().then((success) => {
			this.router.navigate(['/landing-page']);
		});
	}
}
