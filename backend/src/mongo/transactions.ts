import Transaction from "../models/transactions.js";
import { ITransaction } from "../types.js";

export const createTransaction = async (
  userId: string,
  date: string,
  description: string,
  price: number
) => {
  try {
    const transaction = new Transaction({
      userId: userId,
      date: date,
      description: description,
      category: "",
      price: price,
    });

    await transaction.save();
  } catch (error) {
    console.log(error);
  }
};

export const readTransactions = async (userId: string) => {
  try {
    /* The lean function optimizes querries and only has necessary information */
    const categories: ITransaction[] = await Transaction.find({ userId }).lean();
    return categories;
  } catch (error) {
    console.log(error);
  }
};

export const updateTransaction = async (userId: string, transactionId: string, update: object) => {
  try {
    await Transaction.updateOne({ userId: userId, _id: transactionId }, update);
  } catch (error) {
    console.log(error);
  }
};

export const deleteTransaction = async (userId: string, transactionId: string) => {
  try {
    const result = await Transaction.findByIdAndDelete({ _id: transactionId, userId });
    return result;
  } catch (error) {
    console.log(error);
  }
};
