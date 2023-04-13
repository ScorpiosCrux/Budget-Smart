import { Transaction } from "@/types";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";

export const useTransactions = () => {
	/* 
	IMPORTANT NOTE: When creating a copy of this hook, you are DUPLICATING the states!! 
	https://stackoverflow.com/questions/57130413/changes-to-state-issued-from-custom-hook-not-causing-re-render-even-though-added
	*/
	const [isLoading, setIsLoading] = useState(true);
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	const getTransactions = async (user: any) => {
		try {
			const response: AxiosResponse<Transaction[]> = await axios({
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
				throw error;
			} else {
				console.log(error);
				return "Oops Something Went Wrong!";
			}
		}
	};

	/* 
		Sends a CSV file	
	*/
	const uploadTransactionsCSV = async (user: any, file: File) => {
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
			setTransactions(Array.from(response.data));
		} catch (error) {
			if (axios.isAxiosError(error)) {
				throw error;
			} else {
				console.log(error);
				return "Oops Something Went Wrong!";
			}
		}
	};

	/* 
		If the refresh token is expired, we get a new token and then call ourselves
		with the retry flag to true. This ensures we only retry once. If there are further errors
		(e.g. the refreshToken is invalid) we can further handle it. 
	*/
	const sortTransaction = async (user: any, _id: string, categoryName: string) => {
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
				throw error;
			} else {
				return "Oops Something Went Wrong!";
			}
		}
	};

	return { isLoading, transactions, getTransactions, uploadTransactionsCSV, sortTransaction };
};
