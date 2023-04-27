import express from "express";
import * as Users from "../controllers/users.js";
import passport from "passport";
import { verifyUser } from "../authenticate.js";

const router = express.Router({ mergeParams: true });

router.route("/register").get(Users.registerNewUser).post(Users.registerNewUser);

/* POST: Authenticate with a local strategy (username & password) in Axios Request and then gives the user an accessToken*/
router.route("/login").post(passport.authenticate("local", { session: false }), Users.loginUser);
router.route("/logout").get(Users.logoutUser);
router.route("/refreshToken").post(Users.refreshToken);
router.route("/user").get(verifyUser, Users.userInfo);

export default router;
