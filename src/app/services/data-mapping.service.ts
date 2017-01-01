import {Injectable} from '@angular/core';
import {GlobalsService} from "./globals.service";
import * as _ from 'lodash';
import {UserAccountService} from "./user-account.service";

@Injectable()
export class DataMappingService {
	globalsService: GlobalsService;
	userAccountService: UserAccountService;
	project: any = {};

	constructor(globalsService: GlobalsService, userAccountService: UserAccountService) {
		let that = this;
		this.globalsService = globalsService;
		this.userAccountService = userAccountService;

		this.project.toVM = (projectDetails: any): ProjectDetails => {
			let result = projectDetails;
			result.projectName = result.name;
			delete result.name;



			if (Array.isArray(result.users)) {// if user details are provided
				let projectUsers: ProjectUser[] = [];
				_.forEach(result.users, function (value) {
					let currentProject: any = _.find(value.projects, function (value, key) {
						return key === projectDetails.$key;
					});

					let userRole = _.keys(currentProject.userRoles)[0];

					projectUsers.push({
						userKey: value.$key,
						fullName: value.firstName + ' ' + value.lastName,
						firstName: value.firstName,
						lastName: value.lastName,
						email: that.globalsService.firebaseCodec.decode(value.email),
						userRole: that.userAccountService.getRoleDescription(userRole)
					})
				});

				delete result.users;

				result.projectUsers = projectUsers;

				if(that.userAccountService.isAdmin){
					result.currentUserRole = 'Global Administrator';
				}else{
					result.currentUserRole = _.find(result.projectUsers, function (projectUser: any) {
						return projectUser.userKey === that.userAccountService.auth.uid;
					}).userRole;
				}
			}else{
				if(that.userAccountService.isAdmin){
					result.currentUserRole = 'Global Administrator';
				}else{
					result.currentUserRole = that.userAccountService.getRoleDescription(_.keys(projectDetails.users[that.userAccountService.auth.uid].userRoles)[0]);
				}
			}

			return result;
		}
	}
}
