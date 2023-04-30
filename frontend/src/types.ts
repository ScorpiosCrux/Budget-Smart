/* 
	This file contains any high reuse types and interfaces
*/
import { ICreateCategory, IDeleteCategory } from "./utils/Categories";
import { IDeleteTransaction, IUpdateTransaction, IUploadTransactions } from "./utils/Transactions";

export interface ObjectKeys {
	[key: string]: any;
}

export interface IUser extends ObjectKeys {
	_id: string;
	email: string;
	displayName: string;
	token: string;
}

/**
 * The interface for the transaction object
 */
export interface ITransaction {
	_id: string;
	date: string;
	description: string;
	category: string;
	price: number;
}

/* We could maybe use a generic interface <T> but Omit */

/**
 * Interface for handling sorting a transaction. Omits the user field.
 */
export interface IHandleSortTransaction extends Omit<IUpdateTransaction, "user"> {
	retry?: boolean;
}

export interface IHandleUploadTransactions extends Omit<IUploadTransactions, "user"> {
	retry?: boolean;
}

export interface IHandleDeleteTransaction extends Omit<IDeleteTransaction, "user"> {
	retry?: boolean;
}

export interface IHandleDeleteCategory extends Omit<IDeleteCategory, "user"> {
	retry?: boolean;
}

export interface IHandleCreateCategory extends Omit<ICreateCategory, "user"> {
	retry?: boolean;
}

// export function instanceOfTransaction(object: any): object is Transaction {
// 	return object.discriminator === "transaction";
// }

export interface ICategoryForm {
	categoryName: string;
	budget: number;
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
