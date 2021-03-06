import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {ProjectEntityService} from "../services/project-entity.service";

@Injectable()
export class ProjectListResolverService  implements Resolve<any> {
	projectEntityService: ProjectEntityService;

	constructor(projectEntityService: ProjectEntityService) {
		this.projectEntityService = projectEntityService;
	}

	resolve(route: ActivatedRouteSnapshot) {
		let that = this;

		return new Promise((resolve, reject) => {
			this.projectEntityService.projectListStateChange$.subscribe(
				projectList => {
					if(!this.projectEntityService.isProjectListInitialized){
						this.projectEntityService.initializeProjectList({showBusyIndicator: true});
					}else{
						resolve(projectList);
					}
				});
		});
	}
}

