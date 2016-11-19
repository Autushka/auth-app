import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {
	FirebaseAuthState, AngularFire, FirebaseObjectObservable
} from "angularfire2";
import anything = jasmine.anything;
import {GlobalsService} from "./globals.service";

let profileDetails: ProfileDetails = {};

@Injectable()
export class UserAccountService {
	isAdmin: boolean;

	profileDetails: any;
	profileDetailsSnapshot: ProfileDetails;
	isProfileDetailsInitialized: boolean;

	adminCheck: any;
	isAdminCheckInitialized: boolean;

	auth: FirebaseAuthState;
	af: AngularFire;
	adminCheckAF: FirebaseObjectObservable<any>;
	profileDetailsAF: FirebaseObjectObservable<any>;

	profileDetailsStateChange$: any;
	adminCheckStateChange$: any;

	globalService: GlobalsService;


	constructor(globalsService: GlobalsService) {
		this.globalService = globalsService;
		this.initialize();
	}

	changeProfileDetailsState(profileDetails: any) {
		this.profileDetails.next(profileDetails);
		this.profileDetailsSnapshot = profileDetails;
	}

	changeAdminCheckState(adminCheck: any) {
		this.adminCheck.next(adminCheck);
	}

	setAF(af: AngularFire) {
		this.af = af;
	}

	setAuth(auth: FirebaseAuthState) {
		this.auth = auth;
	}

	getAuth() {
		return this.auth;
	}

	initialize() {
		this.isAdmin = false;
		this.profileDetails = new BehaviorSubject(profileDetails);
		this.profileDetailsSnapshot = {firstName: '', lastName: '', email: '', photoURL: ''};
		this.isProfileDetailsInitialized = false;
		this.profileDetailsAF = null;
		this.profileDetailsStateChange$ = this.profileDetails.asObservable();


		this.adminCheck = new BehaviorSubject({isAdmin: false});
		this.isAdminCheckInitialized = false;
		this.adminCheckStateChange$ = this.adminCheck.asObservable();
	}

	initializeAdminCheck(params: FireBaseCallParams) {
		this.adminCheckAF = this.af.database.object('/admins/' + this.auth.uid);
		this.isAdminCheckInitialized = true;

		this.adminCheckAF.first().subscribe(data => {
			if (data.$exists()) {
				this.isAdmin = true;
				this.changeAdminCheckState({isAdmin: true});
			} else {
				this.isAdmin = false;
				this.changeAdminCheckState({isAdmin: false});
			}
		});
	}

	initializeProfileDetails(params: FireBaseCallParams) {
		let that = this;
		this.profileDetailsAF = this.af.database.object('/users/' + this.auth.uid);
		this.isProfileDetailsInitialized = true;

		if (params.showBusyIndicator) {
			this.globalService.changeBusyIndicatorState(true);
		}

		this.profileDetailsAF.first().subscribe(data => {
			let firstName = '';
			let lastName = '';
			let newUserProfile: ProfileDetails = {firstName: '', lastName: '', email: '', photoURL: ''};

			if (!data.$exists()) {
				switch (that.auth.provider) {
					case 3: { // google.com
						firstName = that.auth.auth.providerData[0].displayName.split(' ')[0];
						lastName = that.auth.auth.providerData[0].displayName.split(' ')[1];
						newUserProfile = {
							firstName: firstName,
							lastName: lastName,
							email: that.auth.auth.providerData[0].email,
							photoURL: that.auth.auth.providerData[0].photoURL
						};
						break;
					}
				}
				that.profileDetailsAF.set(newUserProfile);
				that.changeProfileDetailsState(newUserProfile);
			} else {
				newUserProfile.firstName = data.firstName;
				newUserProfile.lastName = data.lastName;
				newUserProfile.email = data.email;
				newUserProfile.photoURL = data.photoURL;

				that.changeProfileDetailsState(newUserProfile);
			}

			if (params.showBusyIndicator) {
				this.globalService.changeBusyIndicatorState(false);
			}
		});
	}
}
