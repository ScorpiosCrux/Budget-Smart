import express from "express";
import { verifyUser } from "../authenticate.js";
import * as Categories from "../controllers/categories.js";

const router = express.Router({ mergeParams: true });

// api/categories/...
router
  .route("/")
  .get(verifyUser, Categories.readCategories)
  .delete(verifyUser, Categories.deleteCategory);

router.route("/new").post(verifyUser, Categories.createCategory);

export default router;
