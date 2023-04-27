/* 
	This file contains any high reuse types and interfaces
*/

export interface ObjectKeys {
	[key: string]: any;
}

export interface IUser extends ObjectKeys {
	_id: string;
	email: string;
	displayName: string;
	token: string;
}

// export interface IAuthUser extends User {
// 	isLoggedIn: boolean;
// 	token: string;
// }

export interface Transaction {
	// discriminator: "transaction";
	_id: string;
	date: string;
	description: string;
	category: string;
	price: number;
}

// export function instanceOfTransaction(object: any): object is Transaction {
// 	return object.discriminator === "transaction";
// }

export interface Category {
	_id: string;
	userId: string;
	name: string;
	budget: number;

	/* The following are calculated after query */
	remainingBudget: number;
	totalSpent: number;
	remainingBudgetPerDay: number;
}


/**
 * Only necessary data is saved to the database.
 */
export interface ICategoryPartial {
  _id: string;
  userId: string;
  name: string;
  budget: number;
}

/**
 * This is the complete category type
 */
export interface ICategory {
  _id: string;
  userId: string;
  name: string;
  budget: number;
  remainingBudget: number;
  totalSpent: number;
  remainingBudgetPerDay: number;
}

/**
 * Defines whether we are editing categories or transactions
 */
export enum TargetType {
	Category = 0,
	Transaction = 1,
}
