import { Request, Response } from "express";
import * as csv from "@fast-csv/parse";
import Transaction from "../models/transactions.js";

export const importTransactions = async () => {
	// Get File and Save

	// Read File (after checking for possible breaking characters or code)

	// Name this file transactions/userId.csv
	const csv_file_path = "/Users/vivid/Code/Smart-Budget/backend/src/utilities/transactions.csv";

	csv.parseFile(csv_file_path)
		.on("error", (error) => console.error(error))
		.on("data", (row) => {
			// Specific for TD Canada Trust
			const transaction = new Transaction({
				userId: "1234",
				date: row[0],
				description: row[1],
				category: "",
				price: row[2],
			});

			transaction.save((err: any) => {
				if (err) console.log(err);
				else {
					console.log("Successfully Saved Transaction");
					console.log(row);
				}
			});
		})
		.on("end", (rowCount: number) => console.log(`Parsed ${rowCount} rows`));
};

export const getTransactions = async (req: Request, res: Response) => {
	const userId = "1234";

	const posts = await Transaction.find({ userId: userId });
	console.log("Done")

	return res.status(200).json(posts)

};
