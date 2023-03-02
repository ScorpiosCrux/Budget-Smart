import passport from "passport";
import jwt from "jsonwebtoken";
import { CookieOptions } from "express";
import dotenv from "dotenv"


dotenv.config();

// const dev = process.env.NODE_ENV !== "production";

export const COOKIE_OPTIONS: CookieOptions = {
	httpOnly: true,
	// Since localhost is not having https protocol,
	// secure cookies do not work correctly (in postman)
	// enable this if you want to try it in Chrome/React
	secure: true,
	signed: true,
	maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
	sameSite: 'none',
};

/* 
	Used to create the JWT
*/
export const getToken = (user: string | object | Buffer) => {
	return jwt.sign(user, process.env.SECRET_JWT, {
		expiresIn: eval(process.env.SESSION_EXPIRY),
	});
};

/* 
	Used to create the refresh token, which contains the JWT
*/
export const getRefreshToken = (user: string | object | Buffer) => {
	const refreshToken = jwt.sign(user, process.env.SECRET_REFRESH_TOKEN, {
		expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY),
	});
	return refreshToken;
};

export const verifyUser = passport.authenticate("jwt", { session: false });
