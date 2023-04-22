/**
 * This file contains all queries related to categories.
 */

import { error } from "console";
import Category from "../models/category.js";

// ========== ERROR HANDLER =========
/**
 * This handler is a generic handler for all use. Adapt function to different errors.
 * @param error The error which we are handling
 * @returns a string with the return message. Does not return yet.
 */
export const errorHandler = (error: any): string => {
  if (error) {
    if (error.code === 11000) {
      console.log("Category already exists!");
      return "Category already exists!";
    } else {
      console.log("Some other error");
      console.log(error);
    }
  }
};
// ========== ERROR HANDLER =========

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

export const newCategory = async (userId: string, categoryName: string, budget: number) => {
  const category = new Category({
    userId: userId,
    name: categoryName,
    budget: budget,
  });

	/* 
		
	*/
  try {
    await category.save((err: any) => {
      if (err) {
        if (err.name === "MongoServerError" && err.code === 11000) {
          console.log("category already exists");
        } else {
          // If any errors arrive here, you should handle it.
          console.log(err);
          // return "Check print statements";
        }
      }
    });
  } catch (error) {
		console.log("trycat block error")
	}
};
