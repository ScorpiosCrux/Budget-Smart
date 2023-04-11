import { Category } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { useCategories } from "./useCategories";
import { useTransactions } from "./useTransactions";

export const useData = () => {
	// TODO: Not too fond of categories: oldCategories
	const { isLoading: isCategoriesLoading, categories, calculateCategories } = useCategories();
	const { isLoading: isTransactionsLoading, transactions, sortTransaction } = useTransactions();

	const [isLoading, setIsLoading] = useState(true);

	/* Is ran on initial load */
	useEffect(() => {
		if (!(isCategoriesLoading || isTransactionsLoading)) {
			calculateCategories(transactions);
			setIsLoading(false);
		}
	}, [isCategoriesLoading, isTransactionsLoading]);

	/* Is ran on when transactions change */
	useEffect(() => {
		if (isLoading === false) {
			console.log("transactions updated");
			calculateCategories(transactions);
		}
	}, [transactions]);

	//TODO: add recalculateCategory(category: _id)

	return { isLoading, categories, transactions, sortTransaction };
};
