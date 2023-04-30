import { ICategory, ITransaction } from "@/types";
import * as CategoryAPI from "./Categories";
import * as TransactionAPI from "./Transactions";
import { SetStateAction } from "react";

// ================== CATEGORIES ==================

/**
 * CREATE
 * Updates the categories after deleting it. Also updates the isLoading state.
 * This method is here to avoid prop drilling. A component that needs this
 * method can simply import it.
 */
export interface ICreateCategoryHandler extends CategoryAPI.ICreateCategory {
  setCategories: React.Dispatch<SetStateAction<ICategory[]>>;
  setIsCategoriesLoading: React.Dispatch<SetStateAction<boolean>>;
}
export const createCategory = async (props: ICreateCategoryHandler) => {
  const { setCategories, setIsCategoriesLoading } = props;
  setIsCategoriesLoading(true);
  const newCategories: ICategory[] = await CategoryAPI.createCategory(props);
  setCategories(newCategories);
  setIsCategoriesLoading(false);
};

/**
 * READ
 * Updates the categories after deleting it. Also updates the isLoading state.
 * This method is here to avoid prop drilling. A component that needs this
 * method can simply import it.
 */
export interface IReadCategoryHandler extends CategoryAPI.IReadCategories {
  setCategories: React.Dispatch<SetStateAction<ICategory[]>>;
  setIsCategoriesLoading: React.Dispatch<SetStateAction<boolean>>;
}
export const getCategories = async (props: IReadCategoryHandler) => {
  const { setCategories, setIsCategoriesLoading } = props;
  setIsCategoriesLoading(true);
  const newCategories: ICategory[] = await CategoryAPI.readCategories(props);
  setCategories(newCategories);
  setIsCategoriesLoading(false);
};

/**
 * DELETE
 * Updates the categories after deleting it. Also updates the isLoading state.
 * This method is here to avoid prop drilling. A component that needs this
 * method can simply import it.
 */
export interface IDeleteCategoryHandler extends CategoryAPI.IDeleteCategory {
  setCategories: React.Dispatch<SetStateAction<ICategory[]>>;
  setIsCategoriesLoading: React.Dispatch<SetStateAction<boolean>>;
}
export const deleteCategory = async (props: IDeleteCategoryHandler) => {
  const { setCategories, setIsCategoriesLoading } = props;
  setIsCategoriesLoading(true);
  const newCategories: ICategory[] = await CategoryAPI.deleteCategory(props);
  setCategories(newCategories);
  setIsCategoriesLoading(false);
};

// ================== END OF CATEGORIES ==================

// ================== TRANSACTIONS ==================
export interface IReadTransactionsHandler extends TransactionAPI.IReadTransactions {
  setTransactions: React.Dispatch<SetStateAction<ITransaction[]>>;
  setIsTransactionsLoading: React.Dispatch<SetStateAction<boolean>>;
}
export const getTransactions = async (props: IReadTransactionsHandler) => {
  const { setTransactions, setIsTransactionsLoading } = props;
  setIsTransactionsLoading(true);
  const newTransactions: ITransaction[] = await TransactionAPI.readTransactions(props);
  setTransactions(newTransactions);
  setIsTransactionsLoading(false);
};

export interface IUpdateTransactionHandler extends TransactionAPI.IUpdateTransaction {
  setTransactions: React.Dispatch<SetStateAction<ITransaction[]>>;
  setIsTransactionsLoading: React.Dispatch<SetStateAction<boolean>>;
}
export const updateTransaction = async (props: IUpdateTransactionHandler) => {
  const { setTransactions, setIsTransactionsLoading } = props;
  setIsTransactionsLoading(true);
  const newTransactions: ITransaction[] = await TransactionAPI.updateTransaction(props);
  setTransactions(newTransactions);
  setIsTransactionsLoading(false);
};

export interface IUploadTransactionsHandler extends TransactionAPI.IUploadTransactions {
  setTransactions: React.Dispatch<SetStateAction<ITransaction[]>>;
  setIsTransactionsLoading: React.Dispatch<SetStateAction<boolean>>;
}
export const uploadTransactions = async (props: IUploadTransactionsHandler) => {
  const { setTransactions, setIsTransactionsLoading } = props;
  setIsTransactionsLoading(true);
  const newTransactions: ITransaction[] = await TransactionAPI.uploadTransactions(props);
  setTransactions(newTransactions);
  setIsTransactionsLoading(false);
};

export interface IDeleteTransactionHandler extends TransactionAPI.IDeleteTransaction {
  setTransactions: React.Dispatch<SetStateAction<ITransaction[]>>;
  setIsTransactionsLoading: React.Dispatch<SetStateAction<boolean>>;
}
export const deleteTransaction = async (props: IDeleteTransactionHandler) => {
  const { setTransactions, setIsTransactionsLoading } = props;
  setIsTransactionsLoading(true);
  const newTransactions: ITransaction[] = await TransactionAPI.deleteTransaction(props);
  setTransactions(newTransactions);
  setIsTransactionsLoading(false);
};

// ================== END OF TRANSACTIONS ==================

/**
 * Calculates the missing attributes of categories.
 * Instead of storing these simple operations.
 * @param transactions Array of transactions to perform calculations with.
 */
export interface ICalculateCategories {
  categories: ICategory[];
  transactions: ITransaction[];
}
export const calculateCategories = (props: ICalculateCategories) => {
  const { categories, transactions } = props;
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
