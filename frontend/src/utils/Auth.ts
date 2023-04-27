import { IAuthUser } from "@/types";
import axios, { AxiosError } from "axios";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface IRegister {
	displayName: string;
	email: string;
	password: string;
}

export const register = async (props: { displayName: string; email: string; password: string }) => {
	const { displayName, email, password } = props;

	try {
		const response = await axios({
			method: "POST",
			data: {
				displayName,
				username: email,
				password,
			},
			withCredentials: true,
			url: process.env.NEXT_PUBLIC_API_ENDPOINT + "/auth/register",
		});

		const authUser: IAuthUser = {
			...response.data,
		};

		return authUser;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 409) {
				// return "Email Already Exists!";
				throw "Email Already Exists!";
			}
		} else {
			console.log(error);
			// return "Oops Something Went Wrong!";
		}
	}
};

export interface ISignIn {
	email: string;
	password: string;
}

export const login = async (props: { email: string; password: string }) => {
	try {
		const { email, password } = props;
		const response = await axios({
			method: "POST",
			data: {
				username: email,
				password,
			},
			withCredentials: true,
			url: process.env.NEXT_PUBLIC_API_ENDPOINT + "/auth/login",
		});

		const authUser: IAuthUser = {
			...response.data,
		};
		return authUser;
	} catch (error: any) {
		// 	if (axios.isAxiosError(error)) {
		// 		if (error.response) {
		// 			console.log("Response");
		// 			console.log(error.response);
		// 		} else if (error.request) {
		// 			console.log("Request");
		// 			console.log(error.request);
		// 		} else if (error.message) {
		// 			console.log("Message");

		// 			console.log(error.message);
		// 		}

		// 		if (error.response?.status === 401) {
		// 			return "Incorrect Username or Password!";
		// 			// add throws?
		// 		}
		// 	} else {
		// 		console.log(error);
		// 		return "Oops Something Went Wrong!";
		// 	}
		throw "error in Auth";
	}
};

const checkExpiry = (token: string) => {
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

export const refreshToken = async () => {
	try {
		const response = await axios({
			method: "POST",
			withCredentials: true,
			url: process.env.NEXT_PUBLIC_API_ENDPOINT + "/auth/refreshToken",
		});

		let accessToken = response.data.accessToken;
		return accessToken;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 401) {
				console.log("Unable to refresh token! Refresh token may be missing or invalid!");
			} else if (error.response?.status === 500) {
				console.log("500 Error: Token Missing");
			} else {
				console.log(error.response);
			}
		} else {
			console.log(error);
			return "Oops Something Went Wrong!";
		}
	}
};
