/**
 * This file contains all queries related to categories.
 */
import Category from "../models/category.js";
import Transaction from "../models/transactions.js";
import { ICategory, ICategoryPartial } from "../types.js";

/**
 * This function creates a new category and saves it to the database.
 * @param userId userId of the client
 * @param categoryName name of the category we are adding
 * @param budget the budget the client wants to allocate to the category
 */
export const createCategory = async (userId: string, categoryName: string, budget: number) => {
  try {
    const category = new Category({
      userId: userId,
      name: categoryName,
      budget: budget,
    });

    /* The error(s) are passed to the caller */
    await category.save();
  } catch (error) {
    console.log(error);
  }
};

/**
 * Finds all the categories and returns
 * @param userId the userId from the request
 * @returns A promise but an ICategory[]
 */
export const readCategories = async (userId: string) => {
  try {
    /* The lean function optimizes querries and only has necessary information */
    const categories: ICategoryPartial[] = await Category.find({ userId }).lean();

    /* Initializes the categories with the necessary values O(n) */
    const initializedCategories: ICategory[] = [];
    for (let i = 0; i < categories.length; i++) {
      const category: ICategoryPartial = categories[i];
      const initializedCategory: ICategory = {
        ...category,
        remainingBudget: 0,
        totalSpent: 0,
        remainingBudgetPerDay: 0,
      };
      initializedCategories.push(initializedCategory);
    }

    return initializedCategories;
  } catch (error) {
    console.log(error);
  }
};

/**
 * A function that deletes the category from the database. Also updates the transactions
 * @param userId userId of the client
 * @param categoryId the MongoDB id of the category
 * @returns whether operation was successful or not.
 */
export const deleteCategory = async (userId: string, categoryId: string) => {
  try {
    const category: ICategoryPartial = await Category.findOne({ _id: categoryId });

    /* Find transactions of user that has a category name of the one we're deleting */
    const transactions = await Transaction.find({
      userId,
      category: category.name,
    });

    /* Sets the category to "", updates and validates with save() */
    for (let transaction of transactions) {
      transaction.category = "";
      transaction.save();
    }

    /* Deletes the category by _id and userId */
    const result = await Category.findByIdAndDelete({ _id: categoryId, userId });
    return result;
  } catch (error) {
    console.log(error);
  }
};
