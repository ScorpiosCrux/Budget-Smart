import express, { Express, Request, Response } from "express";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/users.js";
import userRoutes from "../routes/users.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const port = 4000;
const app: Express = express();

function initExpressApp() {
	app.use(bodyParser.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(
		cors({
			origin: "http://localhost:3000",
			credentials: true,
		})
	);
}

async function connectDB() {
	try {
		mongoose.set("strictQuery", false);
		await mongoose.connect("mongodb://127.0.0.1:27017/yyc-rents");
		console.log("Database Connected!");
	} catch (error) {
		console.log("Error Connecting!");
	}
}

function enableSessions() {
	const sessionConfig = {
		secret: "thisIsMyGreatSecretOnGitHub",
		resave: false,
		saveUninitialized: true,
		cookie: {
			httpOnly: true, // Should be set to true to prevent XSS. This is the default for express
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // Add a week to Date.now(). Date.now is in milliseconds
			maxAge: 1000 * 60 * 60 * 24 * 7,
		},
	};
	app.use(session(sessionConfig));
	app.use(cookieParser("thisIsMyGreatSecretOnGitHub"));
}

// https://www.youtube.com/watch?v=IUw_TgRhTBE 26:48 move to seperate file if desired
function enablePassport() {
	app.use(passport.initialize());
	app.use(passport.session());
	passport.use(new LocalStrategy(User.authenticate()));
	// use static serialize and deserialize of model for passport session support

	// basically makes a cookie for the session
	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());
}

function addRoutes() {
	app.get("/", (req: Request, res: Response) => {
		res.send("Hello World!!");
	});

	app.use("/api/auth", userRoutes);
}

function startUp() {
	initExpressApp();
	connectDB();
	enableSessions();
	enablePassport();
	addRoutes();
	app.listen(port, () => {
		console.log(`YYC-Rents API Started! Listening on port ${port}`);
	});
}

startUp();
