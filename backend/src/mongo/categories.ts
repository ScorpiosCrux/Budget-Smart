/**
 * This file contains all queries related to categories.
 */

import Category from "../models/category.js";

/**
 * Finds all the categories
 * @param userId the userId from the request
 * @returns an [] of categories
 */
export const findCategories = async (userId: string) => {
  try {
    const categories = await Category.find({ userId });
    return categories;
  } catch (error) {
    console.log(error);
  }
};

/**
 * This function creates a new category and saves it to the database.
 * @param userId userId of the client
 * @param categoryName name of the category we are adding
 * @param budget the budget the client wants to allocate to the category
 */
export const newCategory = async (userId: string, categoryName: string, budget: number) => {
  const category = new Category({
    userId: userId,
    name: categoryName,
    budget: budget,
  });

  /* The error(s) are passed to the caller */
  await category.save();
};


/**
 * A function that deletes the category from 
 * @param userId userId of the client
 * @param categoryId the MongoDB id of the category
 * @returns whether operation was successful or not.
 */
export const deleteCategory = async (userId: string, categoryId: string) => {
  const result = await Category.findByIdAndDelete({ _id: categoryId, userId });
  return result;
};
