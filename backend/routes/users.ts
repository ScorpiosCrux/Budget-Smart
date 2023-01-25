import express from "express";
import * as Users from "../controllers/users.js";
import passport from "passport";

const router = express.Router({ mergeParams: true });

router.route("/register").get(Users.registerNewUser).post(Users.registerNewUser);

router.route("/login").get(Users.loginUserForm).post(passport.authenticate("local", {failureRedirect: "/" }), Users.loginUser);

router.route("/user").get(Users.userInfo);

export default router;
