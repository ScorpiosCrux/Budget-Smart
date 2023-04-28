import { Request, Response } from "express";
import * as csv from "@fast-csv/parse";
import Transaction from "../models/transactions.js";
import * as TransactionQuerries from "../mongo/transactions.js";
import { ITransaction } from "../types.js";

// TODO: This puts loads on the server, could have the client parse the file and send as JSON
/**
 * Creates multiple transactions from the CSV file
 * @param req the request object created by the browser (Axios)
 * @param res the response object that we return to the browser.
 * @returns the response with status code and the new list of transactions.
 */
export const createTransactions = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const file = req.file;

  /* Parses uploaded CSV file path */
  csv
    .parseFile(file.path)
    .on("error", (error) => console.error(error))
    .on("data", async (row) => {
      /* Specific CSV format for TD Canada Trust */
      const date = row[0];
      const description = row[1];
      const price = row[2];

      await TransactionQuerries.createTransaction(userId, date, description, price);
    })
    .on("end", (rowCount: number) => console.log(`Parsed ${rowCount} rows`));

  /* Gets the updated list */
  const transactions: ITransaction[] = await TransactionQuerries.readTransactions(userId);
  return res.status(200).json(transactions);
};

export const readTransactions = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const transactions = await TransactionQuerries.readTransactions(userId);
  return res.status(200).json(transactions);
};

/**
 * Logic for updating the dragged transaction into categories.
 * @param req the request object created by the browser (Axios)
 * @param res the response object that we return to the browser.
 * @returns the response with status code and the new list of transactions.
 */
export const updateTransaction = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const transaction: ITransaction = { ...req.body };
  const transactionId = transaction._id;
  
  await TransactionQuerries.updateTransaction(userId, transactionId, transaction);

  const transactions: ITransaction[] = await TransactionQuerries.readTransactions(userId);
  return res.status(200).json(transactions);
};

/**
 * Deletes the transaction given the userId and transactionId
 * @param req Express request
 * @param res Express response
 * @returns The express status and updated array of transactions
 */
export const deleteTransaction = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const transactionId = req.body.transactionId;

  const result = await TransactionQuerries.deleteTransaction(userId, transactionId);
  const transactions: ITransaction[] = await TransactionQuerries.readTransactions(userId);

  /* If nothing was deleted */
  if (!result) {
    return res.status(404).json(transactions);
  }

  /* If delete was successful and we're returning the updated list */
  return res.status(200).json(transactions);
};
