import express from "express";
import * as Users from "../controllers/users.js";
import passport from "passport";

const router = express.Router({ mergeParams: true });

router.route("/register").get(Users.registerNewUser).post(Users.registerNewUser);

router
	.route("/login")
	.get(Users.loginUserForm)
	.post(Users.loginUser);

export default router;
