import { AuthUser } from "@/types";
import axios from "axios";
import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useUser } from "./useUser";

export const useAuth = () => {
	const { user, addUser, removeUser } = useUser();
	const { getItem } = useLocalStorage();

	/* This runs wherever useAuth is called */
	useEffect(() => {
		const user = getItem("user");
		if (user) {
			addUser(JSON.parse(user));
		}
	}, []);

	const register = async (email: string, password: string) => {
		try {
			const response = await axios({
				method: "POST",
				data: {
					username: email,
					password: password,
				},
				withCredentials: true,
				url: process.env.NEXT_PUBLIC_API_ENDPOINT + "/auth/register",
			});

			// API should return a complete response
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
				if (error.response?.status === 409) {
					return "Email Already Exists!";
				}
			} else {
				console.log(error);
				return "Oops Something Went Wrong!";
			}
		}
	};

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

			// API should return a complete response
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
				if (error.response?.status === 401) {
					return "Incorrect Username or Password!";
				}
			} else {
				console.log(error);
				return "Oops Something Went Wrong!";
			}
		}
	};

	const refreshToken = async () => {
		try {
			const response = await axios({
				method: "POST",
				withCredentials: true,
				url: process.env.NEXT_PUBLIC_API_ENDPOINT + "/auth/refreshToken",
			});
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response?.status === 401) {
					console.log("Refresh Token Missing Or Invalid!");
				} else {
					console.log(error.response);
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

	return { user, register, login, logout };
};
