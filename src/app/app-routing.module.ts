import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {AuthGuardService} from "./auth-guard.service";
import {ProfileDetailsComponent} from "./profile-details/profile-details.component";
import {ProjectListComponent} from "./project-list/project-list.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProfileDetailsResolverService} from "./profile-details/profile-details-resolver.service";
import {NewProjectComponent} from "./new-project/new-project.component";
import {ProjectListResolverService} from "./project-list/project-list-resolver.service";
import {LandingPageResolverService} from "./landing-page/landing-page-resolver.service";


@NgModule({
	imports: [
		RouterModule.forRoot([
			{
				path: 'login',
				component: LoginComponent
			},
			{
				path: 'landing-page',
				component: LandingPageComponent,
				canActivate: [AuthGuardService],
				resolve: {
					resolvedProfileDetails: LandingPageResolverService
				},
				children: [
					{
						path: '',
						component: DashboardComponent,
					},
					{
						path: 'profile-details',
						component: ProfileDetailsComponent,
						resolve: {
							resolvedProfileDetails: ProfileDetailsResolverService
						}
					},
					{
						path: 'project-list',
						component: ProjectListComponent,
						resolve: {
							resolvedProjectList: ProjectListResolverService
						}
					},
					{
						path: 'new-project',
						component: NewProjectComponent,
					}
				]
			},
			{
				path: '',
				redirectTo: '/landing-page',
				pathMatch: 'full'
			},
			{
				path: '**',
				redirectTo: '/landing-page',
				pathMatch: 'full'
			}
		])
	],
	providers: [ProfileDetailsResolverService, ProjectListResolverService, LandingPageResolverService],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule {
}
