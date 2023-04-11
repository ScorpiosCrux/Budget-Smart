import { Transaction } from "@/types";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export const useTransactions = () => {
	/* 
	IMPORTANT NOTE: When creating a copy of this hook, you are DUPLICATING the states!! 
	https://stackoverflow.com/questions/57130413/changes-to-state-issued-from-custom-hook-not-causing-re-render-even-though-added
	*/
	const { user, refreshToken } = useAuth();
	const [isLoading, setIsLoading] = useState(true);
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	useEffect(() => {
		if (user?.isLoggedIn === true) {
			getTransactions();
		}
	}, [user]);

	const getTransactions = async () => {
		await refreshToken();
		try {
			const response : AxiosResponse<Transaction[]> = await axios({
				method: "GET",
				withCredentials: true,
				url: process.env.NEXT_PUBLIC_API_ENDPOINT + "/transactions",
				headers: {
					authorization: "Bearer " + user?.token,
				},
			});

			setTransactions(response.data);
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
		Sends a CSV file	
	*/
	const uploadTransactionsCSV = async (file: File) => {
		try {
			let fileData = new FormData();
			fileData.append("transactions", file);

			// TODO: response should return updated list of transactions
			const response = await axios({
				method: "POST",
				withCredentials: true,
				url: process.env.NEXT_PUBLIC_API_ENDPOINT + "/transactions/upload",
				headers: {
					authorization: "Bearer " + user?.token,
				},
				data: fileData,
			});
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

	const sortTransaction = async (_id: string, categoryName: string) => {
		try {
			const response = await axios({
				method: "POST",
				withCredentials: true,
				url: process.env.NEXT_PUBLIC_API_ENDPOINT + "/transactions/sort",
				headers: {
					authorization: "Bearer " + user?.token,
				},
				data: {
					_id: _id,
					categoryName: categoryName,
				},
			});
			setTransactions(Array.from(response.data));
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

	return { isLoading, transactions, uploadTransactionsCSV, sortTransaction };
};
