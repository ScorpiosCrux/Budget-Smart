/* Building your own Hooks lets you extract component login into reusable functions */

import { IAuthUser } from "@/types";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

/* 
	This hook consumes the AuthContext
*/
export const useUser = () => {
	const { user, setUser } = useContext(AuthContext);
	const { setItem } = useLocalStorage();

	const addUser = (user: IAuthUser) => {
		setUser(user);
		setItem("user", JSON.stringify(user));
	};

	const removeUser = () => {
		setUser(null);
		setItem("user", "");
	};

	return { user, addUser, removeUser };
};
