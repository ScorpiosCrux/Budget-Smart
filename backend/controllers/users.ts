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
			if (err) return console.log("error");
			res.setHeader("Content-Type", "application/json");
			return res.end(JSON.stringify({ success: true }));
		});
	} catch (error) {
		console.log(error);
		res.send("User already exists!");
	}
};

export const loginUserForm = (req: Request, res: Response) => {
	res.send("Login GET Route!");
};

export const loginUser = (req: Request, res: Response) => {
	res.send("Logged In!");
};

export const userInfo = (req: Request, res: Response) => {
	console.log(req.user);
	res.send(req.user);
};
