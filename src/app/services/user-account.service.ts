import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {
	FirebaseAuthState, AngularFire, FirebaseObjectObservable
} from "angularfire2";
import anything = jasmine.anything;
import {GlobalsService} from "./globals.service";
import * as _ from 'lodash';

let profileDetails: ProfileDetails = {};

@Injectable()
export class UserAccountService {
	isAdmin: boolean;

	profileDetails: any;
	profileDetailsSnapshot: any;
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
		this.profileDetailsSnapshot.fullName = this.profileDetailsSnapshot.firstName + ' ' + this.profileDetailsSnapshot.lastName;
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

	getUserRoles() {
		let roles: any[] = [];

		roles.push({key: '', description: 'Select One'});
		roles.push({key: 'admin', description: 'Administrator'});
		roles.push({key: 'projectManager', description: 'Project Manager'});
		roles.push({key: 'reader', description: 'Project Reader'});
		roles.push({key: 'writer', description: 'Project Writer'});

		return roles;
	}

	getRoleDescription(roleKey) {
		return _.find(this.getUserRoles(), function(role){
			return role.key === roleKey;
		}).description;
	}

	initialize() {
		this.isAdmin = false;
		this.profileDetails = new BehaviorSubject(profileDetails);
		this.profileDetailsSnapshot = {};
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

		if (params.showBusyIndicator) {
			this.globalService.changeBusyIndicatorState(true);
		}

		this.profileDetailsAF.first().subscribe(data => {
			let firstName = '';
			let lastName = '';
			let newUserProfile: any;

			newUserProfile = {};

			if (!data.$exists()) {
				switch (that.auth.provider) {
					case 3: { // google.com
						firstName = that.auth.auth.providerData[0].displayName.split(' ')[0];
						lastName = that.auth.auth.providerData[0].displayName.split(' ')[1];
						newUserProfile = {
							firstName: firstName,
							lastName: lastName,
							email: that.globalService.firebaseCodec.encode(that.auth.auth.providerData[0].email),
							photoURL: that.auth.auth.providerData[0].photoURL
						};
						break;
					}
				}

				that.profileDetailsAF.set(newUserProfile);
				//adding email record
				//that.af.database.object('/users/' + this.auth.uid + '/emails/' + this.globalService.firebaseCodec.encode(that.auth.auth.providerData[0].email)).set({active: true});

				// newUserProfile.emails = [];
				// newUserProfile.emails.push(that.globalService.firebaseCodec.encode(that.auth.auth.providerData[0].email));

				that.isProfileDetailsInitialized = true;
				that.changeProfileDetailsState(newUserProfile);
			} else {
				newUserProfile.firstName = data.firstName;
				newUserProfile.lastName = data.lastName;
				newUserProfile.email = that.globalService.firebaseCodec.decode(data.email);//TODO: check if decoding is needed
				newUserProfile.photoURL = data.photoURL;


				//newUserProfile.emails = [];
				//newUserProfile.emails.push(newUserProfile.email);
				// that.af.database.list('/users/' + that.auth.uid + '/emails').first().subscribe(emails => {
				// 	that.profileDetailsSnapshot.emails = [];
				//
				// 	_.forEach(emails, function(email){
				// 		newUserProfile.emails.push(that.globalService.firebaseCodec.decode(email));
				// 	});
				that.isProfileDetailsInitialized = true;
				that.changeProfileDetailsState(newUserProfile);
				//});
				//newUserProfile.emails.push(that.globalService.firebaseCodec.encode(that.auth.auth.providerData[0].email));
			}

			if (params.showBusyIndicator) {
				this.globalService.changeBusyIndicatorState(false);
			}
		});
	}
}
