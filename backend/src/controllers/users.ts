import { Request, Response } from "express";
import User from "../models/users.js";
import passport from "passport";
import { getToken, COOKIE_OPTIONS, getRefreshToken } from "../authenticate.js";

export const registerNewUser = async (req: Request, res: Response) => {
	try {
		// Get Inputs
		const { email, password } = req.body;
		const username = email;

		// Create User, token, refreshToken and append to user
		const user = new User({ email, username, password });
		const token = getToken({ _id: user._id });
		const refreshToken = getRefreshToken({ _id: user._id });
		user.refreshToken.push({ refreshToken });

		// Save user into DB
		const registeredUser = await User.register(user, password);

		res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
		return res.status(201).json({ _id: registeredUser._id, email: registeredUser.email, token: token });
	} catch (error) {
		console.log(error);
		if (error.name === "UserExistsError") res.status(409).json({ error: error.name });
		else res.status(500).json({ error: error.name });
	}
};

export const loginUserForm = (req: Request, res: Response) => {
	res.send("Login GET Route!");
};

export const loginUser = (req: Request, res: Response) => {
	const _id = req.user["_id"];
	const email = req.user["email"];
	return res.status(200).json({ _id: _id, email: email });
};

export const userInfo = (req: Request, res: Response) => {
	console.log(req.user);
	res.send(req.user);
};
