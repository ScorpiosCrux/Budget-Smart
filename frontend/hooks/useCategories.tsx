import { Category, Transaction } from "@/types";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export const useCategories = () => {
	/* 
	IMPORTANT NOTE: When creating a copy of this hook, you are DUPLICATING the states!! 
	https://stackoverflow.com/questions/57130413/changes-to-state-issued-from-custom-hook-not-causing-re-render-even-though-added
	*/
	const { user, refreshToken } = useAuth();
	const [isLoading, setIsLoading] = useState(true);
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		if (user?.isLoggedIn === true) {
			getCategories();
		}
	}, [user]);

	const getCategories = async () => {
		await refreshToken();
		try {
			// https://stackoverflow.com/questions/57629111/how-to-use-a-type-for-the-response-from-axios-get
			const response: AxiosResponse<Category[]> = await axios({
				method: "GET",
				withCredentials: true,
				url: process.env.NEXT_PUBLIC_API_ENDPOINT + "/categories",
				headers: {
					authorization: "Bearer " + user?.token,
				},
			});

			let tempCategories: Category[] = response.data;

			let initializedCategories: Category[] = [];

			for (let i = 0; i < tempCategories.length; i++) {
				let temp = tempCategories[i];
				let initializedCategory = { ...temp };
				initializedCategory.remainingBudget = 0;
				initializedCategory.totalSpent = 0;
				initializedCategory.remainingBudgetPerDay = 0;

				initializedCategories.push(initializedCategory);
			}

			setCategories(initializedCategories);
			setIsLoading(false);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response?.status === 401) {
					return "User Not Signed In!";
				}
			} else {
				console.log(error);
				return "Oops Something Went Wrong!";
			}
		}
	};

	/* 
		Calculates the missing attributes of categories. Instead of storing these simple 
		operations.
		TODO: 6 calls to api right now
	*/
	const calculateCategories = (transactions: Transaction[]) => {
		/* [...categories] copies by value instead of reference */
		const updateCategories: Category[] = [...categories];

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

			category.remainingBudget = Math.round(category.remainingBudget * 100) / 100;
			category.totalSpent = Math.round(category.totalSpent * 100) / 100;
			category.remainingBudgetPerDay = Math.round(category.remainingBudgetPerDay * 100) / 100;
		}

		setCategories(updateCategories);
	};

	//TODO: add recalculateCategory(category: _id)

	return { isLoading, categories, calculateCategories };
};
