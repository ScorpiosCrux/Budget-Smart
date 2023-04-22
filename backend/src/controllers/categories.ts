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

    // TODO POSSIBLE ERROR HERE NO AWAIT
    // const dbErrored = await CategoryQueries.newCategory(userId, categoryName, budget);
    try {
      const mongoResponse = await CategoryQueries.newCategory(userId, categoryName, budget);
    } catch (error) {
      console.log("Mongo Error!");
    }

    // if (dbErrored !== null) {
    // 	// Unprocessable Entity
    // 	console.log("DB ERRORED");
    // 	console.log(dbErrored);
    // 	return res.status(422).json({ error: dbErrored });
    // } else {
    // 	const categories = await CategoryQueries.findCategories(userId);
    // 	return res.status(200).json(categories);
    // }
  } catch (error) {
    console.log(error);
  }
};
