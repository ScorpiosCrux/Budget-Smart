import { ICategory, Transaction } from "@/types";

/**
 * Calculates the missing attributes of categories. 
 * Instead of storing these simple operations.
 * @param transactions Array of transactions to perform calculations with.
 */
export interface ICalculateCategories {
  categories: ICategory[];
  transactions: Transaction[];
}
export const calculateCategories = async (categories: ICategory[], transactions: Transaction[]) => {
  if (!categories) {
    throw "Categories is undefined";
  }
  if (!transactions) {
    throw "Transactions is undefined";
  }

  /* 
    Copy categories by value to update state
    NOTE: [...categories] copies by value instead of reference
  */
  const newCategories: ICategory[] = [...categories];

  /* Resets all values to zero */
  for (const category of newCategories) {
    category.totalSpent = 0;
    category.remainingBudget = 0;
    category.remainingBudgetPerDay = 0;
  }

  /* Calculate values depending on transactions */
  for (const category of newCategories) {
    for (const transaction of transactions) {
      if (transaction.category === category.name) {
        category.totalSpent += transaction.price;
      }
    }
    category.remainingBudget = category.budget - category.totalSpent;
    category.remainingBudget = Math.round(category.remainingBudget * 100) / 100;
    category.totalSpent = Math.round(category.totalSpent * 100) / 100;
    category.remainingBudgetPerDay = Math.round(category.remainingBudgetPerDay * 100) / 100;
  }

  return newCategories;
};
