import express from "express";
import * as Transactions from "../controllers/transactions.js";
import { verifyUser } from "../authenticate.js";
import multer from "multer";

const upload = multer({ dest: "uploaded-transactions/" });

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(verifyUser, Transactions.readTransactions)
  .delete(verifyUser, Transactions.deleteTransaction);
router.route("/sort").post(verifyUser, Transactions.sortTransaction);
router
  .route("/upload")
  .post(verifyUser, upload.single("transactions"), Transactions.createTransactions);

export default router;
