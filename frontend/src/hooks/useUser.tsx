/* Building your own Hooks lets you extract component login into reusable functions */

import { IUser } from "@/types";
import { UserContext } from "@/contexts/AuthContext";
import { useContext, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useUser = () => {
	const { user, setUser } = useContext(UserContext);
	const { setItem } = useLocalStorage();

	const addUser = (user: IUser) => {
		setUser(user);
		setItem("user", JSON.stringify(user));
	};

	const removeUser = () => {
		setUser({
			_id: "",
			email: "",
			displayName: "",
			token: "",
		});
		setItem("user", "");
	};

	return { user, addUser, removeUser };
};
