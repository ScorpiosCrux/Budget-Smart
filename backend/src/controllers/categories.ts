import { Request, Response } from "express";
import Category from "../models/category.js";
import * as CategoryQueries from "../mongo/categories.js";

export const getCategories = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const categories = await CategoryQueries.findCategories(userId);
  return res.status(200).json(categories);
};

/**
 * Used to add a category to the backend.
 * @param req the request object created by the browser (Axios)
 * @param res the response object that we return.
 * @returns the response with status code and the new list of categories.
 */
export const addCategory = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const budget = req.body.budget;
    const categoryName = req.body.categoryName;

    /* 
			.then and await are equivalent in the sense they both use promises.
			Await waits for the promise to resolve, and errors you catch using try/catch blocks
			instead
		*/
    try {
      await CategoryQueries.newCategory(userId, categoryName, budget);
    } catch (error) {
      console.log("Mongo Error!");
    }

  } catch (error) {
    console.log(error);
  }
};
