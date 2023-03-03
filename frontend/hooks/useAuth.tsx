import { AuthUser } from "@/types";
import axios from "axios";
import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useUser } from "./useUser";

export const useAuth = () => {
	const { user, addUser, removeUser } = useUser();
	const { getItem } = useLocalStorage();

	useEffect(() => {
		const user = getItem("user");
		if (user) {
			addUser(JSON.parse(user));
		}
	}, []);

	/* 
		Logs the user in and updates the AuthContext.
	*/
	const login = async (email: string, password: string) => {
		try {
			const response = await axios({
				method: "POST",
				data: {
					username: email,
					password: password,
				},
				withCredentials: true,
				url: process.env.NEXT_PUBLIC_API_ENDPOINT + "/auth/login",
			});

			console.log("Data: ");
			console.log(response.data);
			const authUser: AuthUser = {
				...response.data,
				isLoggedIn: true,
				displayName: "Display Name",
				username: "Username",
			};
			addUser(authUser);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.log(error);
				console.log(error.response?.status);
				if (error.response?.status === 401) {
					return "Incorrect Username or Password!";
				}
			} else {
				console.log(error);
				return "Oops Something Went Wrong!";
			}
		}
	};

	const logout = () => {
		removeUser();
	};

	return { user, login, logout };
};
