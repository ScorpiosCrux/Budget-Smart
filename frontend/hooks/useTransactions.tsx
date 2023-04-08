import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export const useTransactions = () => {
	const { user, refreshToken } = useAuth();
	const [isLoading, setIsLoading] = useState(true);
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		if (user?.isLoggedIn === true) {
			getTransactions();
		}
	}, [user]);

	const getTransactions = async () => {
		await refreshToken();
		try {
			const response = await axios({
				method: "GET",
				withCredentials: true,
				url: process.env.NEXT_PUBLIC_API_ENDPOINT + "/transactions",
				headers: {
					authorization: "Bearer " + user?.token,
				},
			});
			setTransactions(Array.from(response.data));
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
