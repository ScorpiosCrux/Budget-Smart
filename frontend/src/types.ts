/* 
	This file contains any high reuse types and interfaces
*/

export interface ObjectKeys {
	[key: string]: any;
}

export interface User extends ObjectKeys {
	_id: string;
	email: string;
	displayName: string;
	username: string;
}

export interface AuthUser extends User {
	isLoggedIn: boolean;
	token: string;
}
