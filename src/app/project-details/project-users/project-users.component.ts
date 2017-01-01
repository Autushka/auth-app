import {Component, OnInit, Input} from '@angular/core';
import {ProjectEntityService} from "../../services/project-entity.service";

@Component({
  selector: 'project-users',
  templateUrl: './project-users.component.html',
  styleUrls: ['./project-users.component.scss']
})
export class ProjectUsersComponent implements OnInit {
	projectEntityService: ProjectEntityService;
	//projectKey: string;
	@Input() projectUsers: any[];
	@Input() projectKey: string;

  constructor(projectEntityService: ProjectEntityService) {
	  this.projectEntityService = projectEntityService;

  }

  ngOnInit() {
  }

	onDelete(index) {
		//this.projectEntityService.removeUserFromTheProject({projectKey: this.projectKey, userKey: this.projectUsers[index].userKey});
	}

}
