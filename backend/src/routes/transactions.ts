import express from "express";
import * as Transactions from "../controllers/transactions.js";
import { verifyUser } from "../authenticate.js";
import multer from "multer";

const upload = multer({ dest: "uploaded-transactions/" });

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(verifyUser, Transactions.readTransactions)
  .put(verifyUser, Transactions.updateTransaction)
  .delete(verifyUser, Transactions.deleteTransaction);
router
  .route("/upload")
  .post(verifyUser, upload.single("transactions"), Transactions.createTransactions);

export default router;
