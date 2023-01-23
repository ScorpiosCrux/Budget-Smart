import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 3000;

import userRoutes from "../routes/users.js";

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!!");
});

app.use("/", userRoutes);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
