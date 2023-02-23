import express from "express";
import * as Transactions from "../controllers/transactions.js";
import passport from "passport";
import { verifyUser } from "../authenticate.js";

const router = express.Router({ mergeParams: true });

router.route("/").get(verifyUser, Transactions.getTransactions);
// router.route("/").get(Transactions.getTransactions);

export default router;
