import express from "express";
import * as Users from "../controllers/users.js";
import passport from "passport";
import { verifyUser } from "../authenticate.js";

const router = express.Router({ mergeParams: true });

router.route("/register").get(Users.registerNewUser).post(Users.registerNewUser);
router.route("/login").get(Users.loginUserForm).post(passport.authenticate("local", {session: false}), Users.loginUser);
router.route("/logout").get(Users.logoutUser)
router.route("/refreshToken").post(Users.refreshToken);
router.route("/user").get(((req, res, next) => {
	const { signedCookies = {} } = req;
	const { refreshToken } = signedCookies;
	console.log("Users Routes:")
	console.log("Refresh Token: ")
	console.log(refreshToken)
	console.log("JWT Token: ")
	console.log(req.headers.authorization)

	next()
}), verifyUser, Users.userInfo);
// router.route("/user").get(Users.userInfo);

export default router;
