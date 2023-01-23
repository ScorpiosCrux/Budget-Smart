import { Request, Response } from "express";
import User from "../models/users.js";

export const registerNewUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const newUser = new User({email, password})
		const registeredUser = await User.register(newUser, password);
		res.send("User Registerd");
	} catch (error) {}
	console.log("RegisterNewUser");
};
