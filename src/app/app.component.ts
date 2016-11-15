import {Component, ApplicationRef} from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {Router, ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {SharedDataService} from "./shared-data.service";
import {AuthGuardService} from "./auth-guard.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent {
	title: string;
	af: AngularFire;

	constructor(af: AngularFire, sharedDataService: SharedDataService, router: Router, private route: ActivatedRoute) {
		this.af = af;
		sharedDataService.setAF(af);

		af.auth.subscribe(auth => {
			if (!auth) {// in case of logout
				return;
			}

			sharedDataService.setAuth(auth);
			//sharedDataService.checkIfAdmin();
		});
	}
}
