import express from "express";
import * as Users from "../controllers/users.js";

const router = express.Router({ mergeParams: true });

router.route("/register").get(Users.registerNewUser);

export default router;
