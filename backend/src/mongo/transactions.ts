/**
 * This file contains all queries related to transactions.
 */
import Transaction from "../models/transactions.js";
import { ITransaction } from "../types.js";

/**
 * This function creates new transactions and saves it to the db.
 * @param userId The userId of the client
 * @param date Date of transaction
 * @param description Description of transaction
 * @param price Price of transaction
 */
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

/**
 * This function finds all transactions of the userId using lean()
 * @param userId The userId of the client
 * @returns An array of transactions
 */
export const readTransactions = async (userId: string) => {
  try {
    /* The lean function optimizes querries and only has necessary information */
    const transactions: ITransaction[] = await Transaction.find({ userId }).lean();
    return transactions;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Updates an existing transaction document based on an update object.
 * @param userId The userId of the client
 * @param transactionId The id of the transaction from the database
 * @param update The parts of the transaction we want to update
 */
export const updateTransaction = async (userId: string, transactionId: string, update: object) => {
  try {
    await Transaction.updateOne({ userId: userId, _id: transactionId }, update);
  } catch (error) {
    console.log(error);
  }
};

/**
 * This function deletes a transaction based on the userId and transactionId.
 * @param userId The userId of the client
 * @param transactionId The id of the transaction from the database
 * @returns The deleted transaction. Empty if nothing was deleted
 */
export const deleteTransaction = async (userId: string, transactionId: string) => {
  try {
    const result = await Transaction.findByIdAndDelete({ _id: transactionId, userId });
    return result;
  } catch (error) {
    console.log(error);
  }
};
