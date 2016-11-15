import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {SharedDataService} from "../shared-data.service";

@Component({
	selector: 'app-project-list',
	templateUrl: './project-list.component.html',
	styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
	router: Router;
	projectList = [];

	constructor(router: Router, private route: ActivatedRoute, sharedDataService: SharedDataService) {
		let that = this;
		this.router = router;

		this.projectList = route.snapshot.data['resolvedProjectList'];

		sharedDataService.projectListStateChange$.subscribe(
			projectList => {
				that.projectList = projectList;
			});
	}

	ngOnInit() {
	}

	onAdd() {
		this.router.navigate(['/landing-page/new-project']);
	}
}
