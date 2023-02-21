import express from "express";
import * as Transactions from "../controllers/transactions.js"
import passport from "passport";
import { verifyUser } from "../authenticate.js";

const router = express.Router({ mergeParams: true });


// router.route("/transactions").get(verifyUser, Users.userInfo);
router.route("/").get(Transactions.getTransactions);

export default router;
