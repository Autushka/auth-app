declare interface ProfileDetails{
	firstName?: string,
	lastName?: string,
	email?: string,
	photoURL?: string
}

declare interface ProjectUser{
	userKey: string,
	fullName: string,
	firstName: string,
	lastName: string,
	email: string,
	userRole: string
}

declare interface ProjectDetails{
	projectKey: string
	projectName: string,
	currentUserRole: string,
	projectUsers: ProjectUser[]
}

declare interface InvitationDetails{
	projectKey: string,
	sendToEmail: string,
	projectName: string,
	userRole: string
}

declare var require: any;
declare var System: any;

declare interface FireBaseCallParams{
	showBusyIndicator: boolean;
}


declare namespace firebase.database.ServerValue {
	var TIMESTAMP: any
}
