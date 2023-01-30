import { Request, Response } from "express";
import User from "../models/users.js";
import passport from "passport";
import { nextTick } from "process";

export const registerNewUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const username = email;

		const newUser = new User({ email, username, password });
		const registeredUser = await User.register(newUser, password);

		req.login(registeredUser, (err) => {
			if (err) return res.status(500).json(err);
			return res.status(201).json({ _id: registeredUser._id, email: registeredUser.email });
		});
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
