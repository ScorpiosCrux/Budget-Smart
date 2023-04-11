import { Category } from "@/types";
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
			console.log(tempCategories);

			let initializedCategories: Category[] = [];

			for (let i = 0; i < tempCategories.length; i++) {
				let temp = tempCategories[i];
				let initializedCategory = { ...temp };
				initializedCategory.remainingBudget = 0;
				initializedCategory.totalSpent = 0;
				initializedCategory.remainingBudgetPerDay = 0;

				initializedCategories.push(initializedCategory);
			}

			console.log(initializedCategories)

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

	return { isLoading, categories };
};
