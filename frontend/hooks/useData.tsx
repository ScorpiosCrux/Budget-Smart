import { Category } from "@/types";
import axios, { AxiosError, isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { useCategories } from "./useCategories";
import { useTransactions } from "./useTransactions";

export const useData = () => {
	// TODO: Not too fond of categories: oldCategories
	const { user, refreshToken } = useAuth();
	const [isLoading, setIsLoading] = useState(true);

	const {
		isLoading: isCategoriesLoading,
		categories,
		getCategories,
		calculateCategories,
	} = useCategories();
	const {
		isLoading: isTransactionsLoading,
		transactions,
		getTransactions,
		sortTransaction,
	} = useTransactions();

	useEffect(() => {
		fetchData();
	}, [user]);

	const fetchData = async (retry?: boolean) => {
		if (user?.isLoggedIn === true) {
			try {
				await getTransactions(user);
				await getCategories(user);

				console.log("Success!");
			} catch (error) {
				if (isAxiosError(error)) {
					console.log("Access Token Expired!");
					await refreshToken();

					/* If retry value is not present, then try again else 1 retry is enough */
					if (!retry) fetchData(true);
				} else {
					console.log(error);
				}
			}
		}
	};

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
			calculateCategories(transactions);
		}
	}, [transactions]);

	const sortTransactionHelper = async (_id: string, categoryName: string, retry?: boolean) => {
		try {
			sortTransaction(user, _id, categoryName);
		} catch (error) {
			if (isAxiosError(error) && error.response?.status === 401) {
				console.log("Access Token Expired!");
				await refreshToken();
				
				/* If retry value is not present, then try again else 1 retry is enough */
				if (!retry) sortTransactionHelper(_id, categoryName, true);
			}
		}
	};

	return { isLoading, categories, transactions, sortTransactionHelper };
};
