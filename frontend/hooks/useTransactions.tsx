import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export const useTransactions = () => {
	const { user } = useAuth();
	const [isLoading, setIsLoading] = useState(true);
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		if (user?.isLoggedIn === true) {
			console.log(user)
			getTransactions();
		}
	}, [user]);

	const getTransactions = async () => {
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

	return { isLoading, transactions };
};
