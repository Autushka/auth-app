import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {ProjectEntityService} from "../services/project-entity.service";

@Component({
	selector: 'app-project-list',
	templateUrl: './project-list.component.html',
	styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
	router: Router;
	projectList = [];
	projectEntityService: ProjectEntityService;

	constructor(router: Router, private route: ActivatedRoute, projectEntityService: ProjectEntityService) {
		let that = this;
		this.router = router;
		this.projectEntityService = projectEntityService;

		this.projectList = route.snapshot.data['resolvedProjectList'];

		projectEntityService.projectListStateChange$.subscribe(
			projectList => {
				for(let project of projectList){
					project.createdAt = new Date(project.createdAt).toLocaleDateString() + ' ' + new Date(project.createdAt).toLocaleTimeString();
				}
				that.projectList = projectList;
			});
	}

	ngOnInit() {
	}

	onAdd() {
		this.router.navigate(['/landing-page/project-details']);
	}

	onDelete(index) {
		this.projectEntityService.deleteProject(this.projectList[index].$key);
	}

	onEdit(index) {
		this.router.navigate(['/landing-page/project-details/' + this.projectList[index].$key]);
	}
}
