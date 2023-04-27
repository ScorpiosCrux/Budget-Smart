import { IAuthUser } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useUser } from "./useUser";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ISignIn, login } from "@/utils/Auth";
import { FormikHelpers } from "formik";
import { useRouter } from "next/router";

/**
 * Only states and functions that are necessary to be here on each render of each component
 * should be here.
 * @returns
 */
export const useAuth = () => {
	const router = useRouter();
	const [error, setError] = useState<string>("");

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

	



	/* Handler Functions */
	const handleLogin = async (values: ISignIn, { setSubmitting }: FormikHelpers<ISignIn>) => {
		try {
			setSubmitting(true);
			const user = await login(values);

			router.push("/");
		} catch (error: any) {
			console.log()
			console.log(error.message)
			setError(error.message);
			setSubmitting(false);
		}
	};

	return { user, error, handleLogin };
};
