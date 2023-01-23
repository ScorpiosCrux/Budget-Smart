import { Request, Response } from "express";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
// const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true, // not a validation btw
	},
});

// UserSchema.plugin(passportLocalMongoose);

export const user1 = mongoose.model("User", UserSchema);

export const registerNewUser = async (req: Request, res: Response) => {
	console.log("RegisterNewUser");
	res.send("Hello");
};
