import { IAuthUser } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useUser } from "./useUser";
import jwt, { JwtPayload } from "jsonwebtoken";

/**
 * Only states and functions that are necessary to be here on each render of each component
 * should be here.
 * @returns
 */
export const useAuth = () => {
	const { user, addUser, removeUser } = useUser();
	// const [value, setItem, getItem, removeItem] = useLocalStorage();

	/**
	 * Runs on each render of each component.
	 */
	// useEffect(() => {
	// 	/* Gets the user from local storage */
	// 	const user = getItem("user");
	// 	if (user) {
	// 		/* Adds the user to the user context  */
	// 		addUser(JSON.parse(user));
	// 	}
	// });

	return { user, addUser, removeUser };
};
