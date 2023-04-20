import { Request, Response } from "express";
import Category from "../models/category.js";

// Used for testing
export const addCategories = async () => {
	const techCategory = new Category({
		userId: "63f6d942e70890f81697254f",
		name: "New Tech!",
		budget: 750,
	});
	techCategory.save();

	const groceries = new Category({
		userId: "63f6d942e70890f81697254f",
		name: "Groceries",
		budget: 325,
	});
	groceries.save();

	const eatingOut = new Category({
		userId: "63f6d942e70890f81697254f",
		name: "Eating Out 🍔",
		budget: 200,
	});
	eatingOut.save();
};

/**
 * Used to add a category to the backend.
 * @param req the request object created by the browser (Axios)
 * @param res the response object that we return.
 * @returns the response with status code and the new list of categories.
 */
export const addCategory = async (req: Request, res: Response) => {
	const userId = req.user._id;
	const budget = req.body.budget;
	const categoryName = req.body.categoryName;

	const category = new Category({
		userId: userId,
		name: categoryName,
		budget: budget,
	});

	category.save();

	const categories = await Category.find({ userId: userId });
	return res.status(200).json(categories);
};

export const getCategories = async (req: Request, res: Response) => {
	const userId = req.user._id;
	const categories = await Category.find({ userId: userId });
	//TODO: 2 QUERIES?
	return res.status(200).json(categories);
};
