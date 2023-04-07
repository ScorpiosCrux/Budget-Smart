import express from "express";
import * as Transactions from "../controllers/transactions.js";
import passport from "passport";
import { verifyUser } from "../authenticate.js";
import multer from "multer";

const upload = multer();

const router = express.Router({ mergeParams: true });

router.route("/").get(verifyUser, Transactions.getTransactions);
router.route("/upload").post(verifyUser, upload.single("transactions"), Transactions.uploadTransactions);

export default router;
