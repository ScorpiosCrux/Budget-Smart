import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { useCategories } from "./useCategories";
import { useTransactions } from "./useTransactions";

export const useData = () => {
	const { isLoading: isCategoriesLoading, categories } = useCategories();
	const { isLoading: isTransactionsLoading, transactions, sortTransaction } = useTransactions();

	// const { user, refreshToken } = useAuth();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!(isCategoriesLoading || isTransactionsLoading)) {
			setIsLoading(false)
			console.log(isCategoriesLoading)
			console.log(isTransactionsLoading)
		}
	}, [isCategoriesLoading, isTransactionsLoading]);

	return { isLoading, categories, transactions, sortTransaction };
};
