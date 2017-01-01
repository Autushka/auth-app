import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

import anything = jasmine.anything;
import {GlobalsService} from "./globals.service";
import {UserAccountService} from "./user-account.service";
import * as firebase from 'firebase';
import * as _ from 'lodash';
import {DataMappingService} from "./data-mapping.service";

@Injectable()
export class ProjectEntityService {
	projectList: any;
	projectListSnapshot: any;
	isProjectListInitialized = false;
	projectListSubscriber: any;

	projectDetails: any;
	projectDetailsSubscriber: any;
	isProjectDetailsInitialized: boolean;

	projectListAF: Observable<any>;
	projectDetailsAF: Observable<any>;
	projectListStateChange$: any;
	projectDetailsStateChange$: any;

	globalsService: GlobalsService;
	userAccountService: UserAccountService;
	dataMappingService: DataMappingService;

	constructor(globalsService: GlobalsService, userAccountService: UserAccountService, dataMappingService: DataMappingService) {
		this.globalsService = globalsService;
		this.userAccountService = userAccountService;
		this.dataMappingService = dataMappingService;
		this.initialize();
	}

	changeProjectListState(projectList: any) {
		this.projectList.next(projectList);
		this.projectListSnapshot = projectList;
	}

	changeProjectDetailsState(projectDetails: any) {
		this.projectDetails.next(projectDetails);
	}

	initialize() {
		this.projectList = new BehaviorSubject([]);
		this.projectListSnapshot = [];
		this.isProjectListInitialized = false;
		if (this.projectListSubscriber) {
			this.projectListSubscriber.unsubscribe();
		}

		this.projectDetails = new BehaviorSubject({name: ''});
		this.isProjectDetailsInitialized = false;
		if (this.projectDetailsSubscriber) {
			this.projectDetailsSubscriber.unsubscribe();
		}

		this.projectListStateChange$ = this.projectList.asObservable();
		this.projectDetailsStateChange$ = this.projectDetails.asObservable();
	}

	getProject(projectKey, withUsersDetails: boolean, globalParams: FireBaseCallParams) {
		let that = this;
		let response: any = {};

		this.projectDetailsAF = this.userAccountService.af.database.object('/projects/' + projectKey).map(item => {
			return item;
		});

		if (globalParams.showBusyIndicator) {
			this.globalsService.changeBusyIndicatorState(true);
		}

		this.projectDetailsAF.subscribe(data => {
			if (withUsersDetails) {
				let usersObj = [];

				_.forEach(data.users, function (value, key) {
					usersObj.push(that.userAccountService.af.database.object('/users/' + key).first());
				});

				Observable.forkJoin(usersObj).subscribe(users => {
					let userList = [];

					_.forEach(users, function (item) {
						userList.push(item);
					});

					data.users = userList;  //dependency on user entity

					that.changeProjectDetailsState(that.dataMappingService.project.toVM(data));

					if (globalParams.showBusyIndicator) {
						that.globalsService.changeBusyIndicatorState(false);
					}
				});
			} else {
				that.changeProjectDetailsState(that.dataMappingService.project.toVM(data));

				if (globalParams.showBusyIndicator) {
					that.globalsService.changeBusyIndicatorState(false);
				}
			}
		});
	}

	deleteProject(projectKey) {
		this.userAccountService.af.database.object('/projects/' + projectKey).remove();// remove project from the global list
		this.userAccountService.af.database.object('/users/' + this.userAccountService.auth.uid + '/projects/' + projectKey).remove();// remove project from the user project list
	}

	updateProject(projectDetails: ProjectDetails) {
		this.userAccountService.af.database.object('/projects/' + projectDetails.projectKey).update({name: projectDetails.projectName});
	}

	createProject(projectDetails: ProjectDetails) {
		let createdAt = (new Date()).getTime();

		let projectId = this.userAccountService.af.database.list('/projects').push({
			name: projectDetails.projectName,
			members: 1,
			createdBy: this.userAccountService.profileDetailsSnapshot.fullName,
			createdAt: firebase.database.ServerValue.TIMESTAMP //making sure that timestamp sent is equal current server time
		}).key;

		this.userAccountService.af.database.object('/users/' + this.userAccountService.auth.uid + '/projects/' + projectId + '/userRoles/admin').set({admin: true});
		this.userAccountService.af.database.object('/projects/' + projectId + '/users/' + this.userAccountService.auth.uid + '/userRoles/admin').set({admin: true});
	}

	assignUserToProject(params) {
		let roleObj = {};

		roleObj[params.userRole] = true;
		this.userAccountService.af.database.object('/users/' + this.userAccountService.auth.uid + '/projects/' + params.projectKey + '/userRoles/' + params.userRole).set(roleObj);

		this.userAccountService.af.database.object('/projects/' + params.projectKey + '/users/' + this.userAccountService.auth.uid + '/userRoles/' + params.userRole).set(roleObj);
	}

	initializeProjectList(globalParams: FireBaseCallParams) {
		let that = this;

		if (globalParams.showBusyIndicator) {
			this.globalsService.changeBusyIndicatorState(true);
		}

		if (this.userAccountService.isAdmin) {
			this.projectListAF = this.userAccountService.af.database.list('/projects', {
				query: {
					orderByKey: true
				}
			});
		} else {
			this.projectListAF = this.userAccountService.af.database.list('/users/' + this.userAccountService.auth.uid + '/projects', {
				query: {
					orderByKey: true
				}
			}).map(userProjects => {
				return userProjects.map(userProject => {
					return this.userAccountService.af.database.object('/projects/' + userProject.$key);
				})
			}).flatMap((projectsObs) => {
				return Observable.combineLatest(projectsObs);
			});
		}

		this.projectListAF.subscribe(projects => {
			if (that.userAccountService.isAdmin) {
				let projectList = [];
				that.isProjectListInitialized = true;

				_.forEach(projects, function (item) {
					projectList.push(that.dataMappingService.project.toVM(item));
				});

				that.changeProjectListState(projectList.reverse());

				if (globalParams.showBusyIndicator) {
					that.globalsService.changeBusyIndicatorState(false);
				}
			} else {
				let projectsObs = [];

				for (let item of projects.reverse()) {
					projectsObs.push(that.userAccountService.af.database.object('/projects/' + item.$key).first());
				}

				Observable.forkJoin(projectsObs).subscribe(projects => {
					let projectList = [];
					that.isProjectListInitialized = true;

					_.forEach(projects, function (item) {
						projectList.push(that.dataMappingService.project.toVM(item));
					});

					that.changeProjectListState(projectList);

					if (globalParams.showBusyIndicator) {
						that.globalsService.changeBusyIndicatorState(false);
					}
				});
			}
		});
	}
}
