import { Request, Response } from "express";
import User from "../models/users.js";
import jwt from "jsonwebtoken";
import { getAccessToken, COOKIE_OPTIONS, getRefreshToken } from "../authenticate.js";

export const registerNewUser = async (req: Request, res: Response) => {
	try {
		// Get Inputs
		const { displayName, username, password } = req.body;

		// Create User, token, refreshToken and append to user
		const user = new User({ displayName, email: username, username, password });
		const accessToken = getAccessToken({ _id: user._id });
		const refreshToken = getRefreshToken({ _id: user._id });
		user.refreshToken.push({ refreshToken });

		// Save user into DB
		const registeredUser = await User.register(user, password);

		res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
		return res.status(201).json({
			_id: registeredUser._id,
			displayName: registeredUser.displayName,
			email: registeredUser.email,
			accessToken: accessToken,
		});
	} catch (error) {
		console.log(error);
		if (error.name === "UserExistsError") res.status(409).json({ error: error.name });
		else res.status(500).json({ error: error.name });
	}
};

/**
 * Needs the previous middleware to populate _id in req.user
 * Logs in the user and adds a refresh token to the user's refresh token array.
 * @param req the request object created by the browser (Axios)
 * @param res the response object that we return.
 * @returns the response with status code and the user data from the database.
 */
export const loginUser = async (req: Request, res: Response) => {
	try {
		const _id = req.user["_id"];
		const email = req.user["email"];

		const accessToken = getAccessToken({ _id });
		const refreshToken = getRefreshToken({ _id });

		/* Find user by _id */
		const user = await User.findById(_id);
		const displayName = user.displayName;

		/* Adds the refresh token to the array of refreshTokens in the db */
		user.refreshToken.push({ refreshToken });
		user.save();

		/* Adds the refreshToken to the user's cookies */
		res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);

		/* Creates a json object like {_id: ..., email: ...,  etc} */
		return res.status(200).json({ _id, email, accessToken, displayName });
	} catch (error) {
		return res.status(500).json({ error: error });
	}
};

export const refreshToken = (req: Request, res: Response) => {
	const { signedCookies = {} } = req;
	const { refreshToken } = signedCookies;

	console.log("refresh Token");

	if (refreshToken) {
		try {
			const payload = jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN);
			const userId = payload["_id"];
			User.findOne({ _id: userId }).then((user) => {
				if (user) {
					/* Finds the index of the refreshToken from the queried results */
					const refreshTokenIndex = user.refreshToken.findIndex((element: any) => {
						return element.refreshToken === refreshToken;
					});

					if (refreshTokenIndex === -1) {
						res.statusCode = 401;
						res.send("refreshToken invalid");
					} else {
						const accessToken = getAccessToken({ _id: userId });
						/* 
							Refresh Token Rotation.
							If the refresh token exists, create a new one and replace it.
						 */
						const newRefreshToken = getRefreshToken({ _id: userId });
						user.refreshToken[refreshTokenIndex] = { refreshToken: newRefreshToken };
						user.save((error: any, user: any) => {
							if (error) {
								res.statusCode = 500;
								res.send(error);
							} else {
								res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);
								console.log({ accessToken: accessToken });
								res.status(200).json({ accessToken: accessToken });
							}
						});
					}
				} else {
					res.statusCode = 500;
					res.send("Something went wrong!");
				}
			});
		} catch (error) {
			return res.status(500).json({ error: error });
		}
	} else {
		return res.status(500).json({ error: "Something went wrong! Refresh Token Missing" });
	}
};

export const logoutUser = (req: Request, res: Response) => {
	const { signedCookies = {} } = req;
	const { refreshToken } = signedCookies;

	/* 
		If _id does not exist, then user might not be logged in
		as req.user is empty!
	*/
	try {
		const { _id } = req.user;
	} catch (error) {
		res.status(500).json({ error: "User not logged in!" + error });
	}

	User.findById(req.user._id).then(
		(user) => {
			const tokenIndex = user.refreshToken.findIndex(
				(item: { refreshToken: any }) => item.refreshToken === refreshToken
			);

			if (tokenIndex !== -1) {
				user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove();
			}
			user.save((err: any, user: any) => {
				if (err) {
					res.statusCode = 500;
					res.send(err);
				} else {
					res.clearCookie("refreshToken", COOKIE_OPTIONS);
					res.send({ success: true });
				}
			});
		},
		(error) => {
			console.log("Could not logout user!");
			console.log(error);
		}
	);
};

export const userInfo = (req: Request, res: Response) => {
	const { signedCookies = {} } = req;
	const { refreshToken } = signedCookies;
	console.log(refreshToken);

	User.findById(req.user._id).then((user) => {
		const info = user.toJSON();
		res.status(200).json(info);
	});
};
