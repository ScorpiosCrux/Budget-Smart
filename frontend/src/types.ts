/* 
	This file contains any high reuse types and interfaces
*/

import { IUpdateTransaction } from "./utils/Transactions";

export interface ObjectKeys {
  [key: string]: any;
}

export interface IUser extends ObjectKeys {
  _id: string;
  email: string;
  displayName: string;
  token: string;
}

export interface ITransaction {
  // discriminator: "transaction";
  _id: string;
  date: string;
  description: string;
  category: string;
  price: number;
}

export interface IHandleSortTransaction extends Omit<IUpdateTransaction, "user"> {
  retry?: boolean;
}

// export function instanceOfTransaction(object: any): object is Transaction {
// 	return object.discriminator === "transaction";
// }

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
