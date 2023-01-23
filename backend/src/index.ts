import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";

const app: Express = express();
const port = 3000;

try {
	await mongoose.connect("mongodb://127.0.0.1:27017/yyc-rents");
	console.log("Database Connected!");
} catch (error) {
	console.log("Error Connecting!");
}


import userRoutes from "../routes/users.js";

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!!");
});

app.use("/", userRoutes);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
