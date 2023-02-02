import passport from "passport";
import jwt from "jsonwebtoken";

const dev = process.env.NODE_ENV !== "production";

export const COOKIE_OPTIONS = {
	httpOnly: true,
	// Since localhost is not having https protocol,
	// secure cookies do not work correctly (in postman)
	secure: !dev,
	signed: true,
	maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
	sameSite: "none",
};

/* 
	Used to create the JWT
*/
export const getToken = (user: string | object | Buffer) => {
	return jwt.sign(user, process.env.JWT_SECRET, {
		expiresIn: eval(process.env.SESSION_EXPIRY),
	});
};

/* 
	Used to create the refresh token, which contains the JWT
*/
export const getRefreshToken = (user: string | object | Buffer) => {
	const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY),
	});
	return refreshToken;
};

export const verifyUser = passport.authenticate("jwt", { session: false });
