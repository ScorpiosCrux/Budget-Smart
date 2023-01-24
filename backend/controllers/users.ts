import { Request, Response } from "express";
import User from "../models/users.js";
import passport from "passport";

export const registerNewUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const username = email;
		const newUser = new User({ email, username, password });
		const registeredUser = await User.register(newUser, password);
		res.send("User Registerd");
	} catch (error) {
		console.log(error);
		res.send("User already exists!");
	}
};

export const loginUserForm = (req: Request, res: Response) => {
	res.send("Login GET Route!");
};

export const loginUser = (req: Request, res: Response) => {
	passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }),
	res.send("Logged In!")
};
