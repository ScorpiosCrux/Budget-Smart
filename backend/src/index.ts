import express, { Express, Request, Response } from "express";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "./models/users.js";
import userRoutes from "./routes/users.js";
import transactionRoutes from "./routes/transactions.js";
import categoryRoutes from "./routes/categories.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import JwtStrategy from "./strategies/JwtStrategy.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: __dirname + "/.env" });
const port = 4000;
const app: Express = express();

function initExpressApp() {
	app.use(bodyParser.json());
	app.use(cookieParser(process.env.SECRET_COOKIE));
	app.use(express.urlencoded({ extended: true }));
	app.use(
		cors({
			origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
			credentials: true,
		})
	);
}

async function connectDB() {
	try {
		mongoose.set("strictQuery", false);
		await mongoose.connect(process.env.DB_CONNECTION_STRING);
		console.log("Database Connected!");
	} catch (error) {
		console.log("Error Connecting!");
		console.log(error);
	}
}

// https://www.youtube.com/watch?v=IUw_TgRhTBE 26:48 move to seperate file if desired
function enablePassport() {
	app.use(passport.initialize());

	/* 
		Uses a username/password local strategy created by passport-local-mongoose.
		Called during login / signup
	*/
	passport.use(new LocalStrategy(User.authenticate()));
	JwtStrategy(passport);
}

function addRoutes() {
	app.get("/", (req: Request, res: Response) => {
		res.send("Hello World!!");
	});

	app.use("/api/auth", userRoutes);
	app.use("/api/transactions", transactionRoutes);
	app.use("/api/categories", categoryRoutes)
}

function startUp() {
	initExpressApp();
	connectDB();
	enablePassport();
	addRoutes();
	app.listen(port, () => {
		console.log(`YYC-Rents API Started! Listening on port ${port}`);
	});
}

startUp();
