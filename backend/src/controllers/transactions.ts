import Transaction from "../models/transactions.js";

const TestTransaction = new Transaction({
	date: "Feb 20, 2023",
	description: "APPLE.COM/STORE",
	price: "$32.29",
});

TestTransaction.save((err: any) => {
	if (err) console.log(err);
	else console.log("Successfully Saved Transaction")
});
