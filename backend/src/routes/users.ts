import express from "express";
import * as Users from "../controllers/users.js";
import passport from "passport";
import { verifyUser } from "../authenticate.js";

const router = express.Router({ mergeParams: true });

router.route("/register").get(Users.registerNewUser).post(Users.registerNewUser);
router.route("/login").get(Users.loginUserForm).post(passport.authenticate("local"), Users.loginUser);
router.route("/refreshToken").post(Users.refreshToken);
router.route("/user").get(verifyUser, Users.userInfo);

export default router;
