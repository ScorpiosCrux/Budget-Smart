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
		name: "Eating Out <3",
		budget: 200,
	});
	eatingOut.save();
};

export const getCategories = async (req: Request, res: Response) => {
	const userId = req.user._id;
	const categories = await Category.find({ userId: userId });
	//TODO: 2 QUERRIES?
	return res.status(200).json(categories);
};
