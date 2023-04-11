import { Category } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { useCategories } from "./useCategories";
import { useTransactions } from "./useTransactions";

export const useData = () => {
	// TODO: Not too fond of categories: oldCategories
	const { isLoading: isCategoriesLoading, categories: oldCategories } = useCategories();
	const { isLoading: isTransactionsLoading, transactions, sortTransaction } = useTransactions();
	const [categories, setCategories] = useState<Category[]>([]);

	const [isLoading, setIsLoading] = useState(true);

	/* Is ran on initial load */
	useEffect(() => {
		if (!(isCategoriesLoading || isTransactionsLoading)) {
			calculateCategories();
			setIsLoading(false);
		}
	}, [isCategoriesLoading, isTransactionsLoading]);

	/* Is ran on when transactions change */
	useEffect(() => {
		console.log("transactions updated");
		calculateCategories();
	}, [transactions]);

	/* 
		Calculates the missing attributes of categories. Instead of storing these simple 
		operations.
		TODO: 6 calls to api right now
	*/
	const calculateCategories = () => {
		const updateCategories: Category[] = oldCategories;

		/* Reset Values to 0 */
		for (const category of updateCategories) {
			category.totalSpent = 0;
			category.remainingBudget = 0;
			category.remainingBudgetPerDay = 0;
		}

		for (const category of updateCategories) {
			for (const transaction of transactions) {
				if (transaction.category === category.name) {
					category.totalSpent += transaction.price;
				}
			}
			category.remainingBudget = category.budget - category.totalSpent;

			category.remainingBudget = Math.round(category.remainingBudget * 100) / 100
			category.totalSpent = Math.round(category.totalSpent * 100) / 100
			category.remainingBudgetPerDay = Math.round(category.remainingBudgetPerDay * 100) / 100

		}

		setCategories(updateCategories);
	};

	//TODO: add recalculateCategory(category: _id)

	return { isLoading, categories, transactions, sortTransaction };
};
