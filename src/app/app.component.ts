import {Component} from '@angular/core';
import {AngularFire} from 'angularfire2';
import {UserAccountService} from "./services/user-account.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent {
	title: string;
	af: AngularFire;

	constructor(af: AngularFire, userAccountService: UserAccountService) {
		this.af = af;
		userAccountService.setAF(af);

		af.auth.subscribe(auth => {
			if (!auth) {// in case of logout
				return;
			}

			userAccountService.setAuth(auth);
		});
	}
}
