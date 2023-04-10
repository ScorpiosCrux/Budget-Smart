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

export interface Transaction {
	// discriminator: "transaction";
	_id: string;
	date: string;
	description: string;
	category: string;
	price: string;
}

// export function instanceOfTransaction(object: any): object is Transaction {
// 	return object.discriminator === "transaction";
// }

export interface Category {
	_id: string;
	userId: string;
	name: string;
	budget: number;
}
