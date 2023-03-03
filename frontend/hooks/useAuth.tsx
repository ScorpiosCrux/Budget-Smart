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

	const login = (email: string, password: string) => {
		axios({
			method: "post",
			data: {
				username: email,
				password: password,
			},
			withCredentials: true,
			url: process.env.NEXT_PUBLIC_API_ENDPOINT + "/auth/login",
		})
			.then((res) => {
				console.log("Data: ");
				console.log(res.data);
				const authUser : AuthUser = {
					...res.data,
					isLoggedIn: true,
					displayName: "Display Name",
					username: "Username"
				}
				addUser(authUser)
				console.log(user)
			})
			.catch((error) => {
				console.log("error")
			});
		// addUser(user);
	};

	const logout = () => {
		removeUser();
	};

	return { user, login, logout };
};
