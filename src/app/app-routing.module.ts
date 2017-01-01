import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {AuthGuardService} from "./auth-guard.service";
import {ProfileDetailsComponent} from "./profile-details/profile-details.component";
import {ProjectListComponent} from "./project-list/project-list.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProjectDetailsComponent} from "./project-details/project-details.component";
import {ProjectListResolverService} from "./project-list/project-list-resolver.service";
import {LandingPageResolverService} from "./landing-page/landing-page-resolver.service";
import {ProjectDetailsResolverService} from "./project-details/project-details-resolver.service";
import {InvitationListComponent} from "./invitation-list/invitation-list.component";
import {InvitationListResolverService} from "./invitation-list/invitation-list-resolver.service";


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
						// resolve: {
						// 	resolvedProfileDetails: ProfileDetailsResolverService
						// }
					},
					{
						path: 'project-list',
						component: ProjectListComponent,
						resolve: {
							resolvedProjectList: ProjectListResolverService
						}
					},
					{
						path: 'invitation-list',
						component: InvitationListComponent,
						resolve: {
							resolvedInvitationList: InvitationListResolverService
						}
					},
					{
						path: 'project-details',
						component: ProjectDetailsComponent,
					},
					{
						path: 'project-details/:guid',
						component: ProjectDetailsComponent,
						resolve: {
							resolvedProjectDetails: ProjectDetailsResolverService
						}
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
	providers: [ProjectListResolverService, LandingPageResolverService, ProjectDetailsResolverService, InvitationListResolverService],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule {
}
