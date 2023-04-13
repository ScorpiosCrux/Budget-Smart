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

	const categoryHook = useCategories();
	const categories = categoryHook.categories;
	const transactionHook = useTransactions();
	const transactions = transactionHook.transactions;

	useEffect(() => {
		fetchData();
	}, [user]);

	const fetchData = async (retry?: boolean) => {
		if (user?.isLoggedIn === true) {
			try {
				await transactionHook.getTransactions(user);
				await categoryHook.getCategories(user);

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
		if (!(categoryHook.isLoading || transactionHook.isLoading)) {
			categoryHook.calculateCategories(transactionHook.transactions);
			setIsLoading(false);
		}
	}, [categoryHook.isLoading, transactionHook.isLoading]);

	/* Is ran on when transactions change */
	useEffect(() => {
		if (isLoading === false) {
			categoryHook.calculateCategories(transactionHook.transactions);
		}
	}, [transactionHook.transactions]);

	const sort = async (_id: string, categoryName: string, retry?: boolean) => {
		try {
			await transactionHook.sortTransaction(user, _id, categoryName);
		} catch (error) {
			console.log("error useData");
			if (isAxiosError(error)) {
				await refreshToken();

				/* If retry value is not present, then try again else 1 retry is enough */
				if (!retry) await sort(_id, categoryName, true);
			}
		}
	};

	const uploadCSV = async (file: File, retry?: boolean) => {
		try {
			await transactionHook.uploadTransactionsCSV(user, file);
		} catch (error) {
			console.log("error useData");
			if (isAxiosError(error)) {
				await refreshToken();

				/* If retry value is not present, then try again else 1 retry is enough */
				if (!retry) await uploadCSV(file, true);
			}
		}
	};

	const deleteTransaction = async (_id: string, retry?: boolean) => {
		try {
			await transactionHook.deleteTransaction(user, _id);
		} catch (error) {
			console.log("error useData");
			if (isAxiosError(error)) {
				await refreshToken();

				/* If retry value is not present, then try again else 1 retry is enough */
				if (!retry) await deleteTransaction(_id, true);
			}
		}
	};

	return {
		isLoading,
		categories,
		transactions,
		uploadCSV,
		sort,
		deleteTransaction,
	};
};
