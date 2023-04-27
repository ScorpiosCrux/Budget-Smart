import { Category } from "@/types";
import axios, { AxiosError, isAxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { useCategories } from "./useCategories";
import { useTransactions } from "./useTransactions";
import { refreshToken } from "@/utils/Auth";
import { UserContext } from "@/contexts/AuthContext";

export const useData = () => {
	const { user } = useContext(UserContext);
	const categoryHook = useCategories();
	const categories = categoryHook.categories;
	const transactionHook = useTransactions();
	const transactions = transactionHook.transactions;
	const [isLoading, setIsLoading] = useState(true); //The isLoading flag is used to trigger functions and component rendering

	// useEffect(() => {
	//   fetchData();
	// }, [user]);

	const fetchData = async (retry?: boolean) => {
		if (user?.isLoggedIn === true) {
			try {
				await transactionHook.getTransactions(user);
				await categoryHook.getCategories(user);

				console.log("Success!");
			} catch (error) {
				if (isAxiosError(error)) {
					console.log("Access Token Expired!");
					let accessToken = await refreshToken();

					/* If retry value is not present, then try again else 1 retry is enough */
					if (!retry) fetchData(true);
				} else {
					console.log(error);
				}
			}
		}
	};

	// /* Is ran on initial load */
	// useEffect(() => {
	//   if (!(categoryHook.isLoading || transactionHook.isLoading)) {
	//     categoryHook.calculateCategories(transactionHook.transactions);
	//     setIsLoading(false);
	//   }
	// }, [categoryHook.isLoading, transactionHook.isLoading]);

	// /* Is ran on when transactions change */
	// useEffect(() => {
	//   if (isLoading === false) {
	//     console.log("test");
	//     categoryHook.calculateCategories(transactionHook.transactions);
	//   }
	// }, [transactionHook.transactions, isLoading]);

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

	// TODO: move functions that are not state dependent out of here.
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

	/**
	 * Deletes the category using backend API call.
	 * @param _id Category Id
	 * @param _retry Should only be used internally
	 */
	const deleteCategory = async (_id: string, _retry?: boolean) => {
		try {
			setIsLoading(true);
			await categoryHook.deleteCategory(user, _id);
			setIsLoading(false);
		} catch (error) {
			if (isAxiosError(error)) {
				await refreshToken();

				/* If retry value is not present, then try again else 1 retry is enough */
				if (!_retry) await deleteCategory(_id, true);
			} else {
				console.log("error useData");
			}
		}
	};

	/**
	 * Adds a category using backend API call.
	 * @param categoryName The name of the category
	 * @param budget The budget amount
	 * @param _retry An internal flag for retrying if the auth token is expired.
	 */
	const addCategory = async (categoryName: string, budget: number, _retry?: boolean) => {
		try {
			setIsLoading(true);
			await categoryHook.addCategory(user, categoryName, budget);
			setIsLoading(false);
		} catch (error) {
			if (isAxiosError(error)) {
				await refreshToken();

				/* If retry value is not present, then try again else 1 retry is enough */
				if (!_retry) await addCategory(categoryName, budget, true);
			} else {
				console.log("error useData");
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
		deleteCategory,
		addCategory,
	};
};
