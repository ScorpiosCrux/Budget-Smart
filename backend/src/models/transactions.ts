import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: false,
	},
	price: {
		type: String,
		required: true,
	},
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;