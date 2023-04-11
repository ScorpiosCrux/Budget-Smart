import { Category } from "@/types";
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
			setIsLoading(false);
			console.log(isCategoriesLoading);
			console.log(isTransactionsLoading);
		}
	}, [isCategoriesLoading, isTransactionsLoading]);



	/* 
		Calculates the missing attributes of categories. Instead of storing these simple 
		operations.
	*/
	const calculateCategories = () => {
		const updatedCategories = categories;

		/* 
			Since transactions > categories we loop through transactions once.
		*/
		for (const transaction in transactions){

		}
	};

	return { isLoading, categories, transactions, sortTransaction };
};
