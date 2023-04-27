import { IAuthUser } from "@/types";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useUser } from "./useUser";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IRegister, ISignIn, login, register } from "@/utils/Auth";
import { FormikHelpers } from "formik";
import { useRouter } from "next/router";
import { UserContext } from "@/contexts/AuthContext";

/**
 * Only states and functions that are necessary to be here on each render of each component
 * should be here.
 * @returns
 */
export const useAuth = () => {
	const { user, setUser } = useContext(UserContext);
	const { setItem } = useLocalStorage();

	const router = useRouter();
	const [error, setError] = useState<string>("");

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

	const handleRegister = async (values: IRegister, { setSubmitting }: FormikHelpers<IRegister>) => {
		try {
			setSubmitting(true);
			const user = await register(values);
			if (user) {
				setUser(user);
				setItem("user", JSON.stringify(user));
			}

			console.log(user);

			router.push("/");
		} catch (error: any) {
			setSubmitting(false);
			setError(error.message);
		}
	};

	/* Handler Functions */
	const handleLogin = async (values: ISignIn, { setSubmitting }: FormikHelpers<ISignIn>) => {
		try {
			setSubmitting(true);
			const user = await login(values);

			if (user) {
				setUser(user);

				setItem("user", JSON.stringify(user));
			}
			console.log(user);

			router.push("/");
		} catch (error: any) {
			console.log();
			console.log(error.message);
			setError(error.message);
			setSubmitting(false);
		}
	};

	return { user, error, handleLogin, handleRegister };
};
