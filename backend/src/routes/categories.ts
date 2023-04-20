import express from "express";
import { verifyUser } from "../authenticate.js";
import * as Categories from "../controllers/categories.js";

const router = express.Router({ mergeParams: true });

router.route("/").get(verifyUser, Categories.getCategories);
router.route("/new").post(verifyUser, Categories.addCategory);

export default router;
