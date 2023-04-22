import { Request, Response } from "express";
import * as CategoryQueries from "../mongo/categories.js";

/**
 * Used to find all the categories associated with a user.
 * @param req the request object created by the browser (Axios)
 * @param res the response object that we return.
 * @returns the response with status code and the new list of categories.
 */
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
    await CategoryQueries.newCategory(userId, categoryName, budget);
    const categories = await CategoryQueries.findCategories(userId);
    return res.status(200).json(categories);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Deletes the category given the userId and categoryId
 * @param req Express request
 * @param res Express response
 * @returns The express status and categories
 */
export const deleteCategory = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const categoryId = req.body._id;

  const result = await CategoryQueries.deleteCategory(userId, categoryId);

  const categories = await CategoryQueries.findCategories(userId);

  /* If nothing was deleted */
  if (!result) {
    return res.status(404).json(categories);
  }

  /* If delete was successful and we're returning the updated list */
  return res.status(200).json(categories);
};
