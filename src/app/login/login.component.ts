import {Component, OnInit, ApplicationRef} from '@angular/core';
import {AngularFire} from "angularfire2";
import {Router} from "@angular/router";
import {GlobalsService} from "../services/globals.service";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	af: AngularFire;
	isBusyIndicatorShown: boolean;
	router: Router;

	constructor(af: AngularFire, globalsService: GlobalsService, router: Router,) {
		this.af = af;
		this.router = router;

		globalsService.busyIndicatorStateChange$.subscribe(
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
