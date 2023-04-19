import { AuthUser } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useUser } from "./useUser";
import jwt, { JwtPayload } from "jsonwebtoken";

export const useAuth = () => {
	const { user, addUser, removeUser } = useUser();
	const { getItem } = useLocalStorage();
	const [isLoading, setIsLoading] = useState(false);

	/* This runs wherever useAuth is called */
	useEffect(() => {
		const user = getItem("user");
		if (user) {
			addUser(JSON.parse(user));
		}
	}, []);

	const register = async (displayName: string, email: string, password: string) => {
		try {
			const response = await axios({
				method: "POST",
				data: {
					displayName: displayName,
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

	const isExpired = (token: string) => {
		var isExpired = false;
		var decodedToken: JwtPayload | null = jwt.decode(token, { complete: true });

		if (!decodedToken || !decodedToken.payload.exp) {
			console.log(decodedToken);
			console.log("Decoding Error!");
		} else {
			var dateNow = new Date();
			if (decodedToken.payload.exp * 1000 < dateNow.getTime()) {
				isExpired = true;
			}
		}
		return isExpired;
	};

	const refreshToken = async () => {
		console.log("Refresh Token");

		/* If already called, return */
		if (isLoading) {
			console.log("Already refreshing token!");
			return;
		}

		setIsLoading(true);
		const token = user?.token;
		if (token && isExpired(token)) {
			console.log("refreshToken call");
			try {
				const response = await axios({
					method: "POST",
					withCredentials: true,
					url: process.env.NEXT_PUBLIC_API_ENDPOINT + "/auth/refreshToken",
				});

				let newUser = user;
				newUser.token = response.data.token;

				addUser(newUser);
				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);
				if (axios.isAxiosError(error)) {
					if (error.response?.status === 401) {
						removeUser();
						console.log("Unable to refresh token! Refresh token may be missing or invalid!");
					} else if (error.response?.status === 500) {
						removeUser();
						console.log("500 Error: Token Missing");
					} else {
						console.log(error.response);
					}
				} else {
					console.log(error);
					return "Oops Something Went Wrong!";
				}
			}
		}
	};

	const logout = () => {
		removeUser();
	};

	return { user, register, login, refreshToken, logout };
};
