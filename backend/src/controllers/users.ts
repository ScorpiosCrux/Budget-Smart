import { Request, Response } from "express";
import User from "../models/users.js";
import jwt from "jsonwebtoken";
import { getToken, COOKIE_OPTIONS, getRefreshToken } from "../authenticate.js";

export const registerNewUser = async (req: Request, res: Response) => {
	try {
		// Get Inputs
		const { email, password } = req.body;
		const username = email;

		// Create User, token, refreshToken and append to user
		const user = new User({ email, username, password });
		const token = getToken({ _id: user._id });
		const refreshToken = getRefreshToken({ _id: user._id });
		user.refreshToken.push({ refreshToken });

		// Save user into DB
		const registeredUser = await User.register(user, password);

		res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
		return res.status(201).json({ _id: registeredUser._id, email: registeredUser.email, token: token });
	} catch (error) {
		console.log(error);
		if (error.name === "UserExistsError") res.status(409).json({ error: error.name });
		else res.status(500).json({ error: error.name });
	}
};

export const loginUserForm = (req: Request, res: Response) => {
	res.send("Login GET Route!");
};

export const loginUser = (req: Request, res: Response) => {
	const _id = req.user["_id"];
	const email = req.user["email"];

	const token = getToken({ _id: _id });
	const refreshToken = getRefreshToken({ _id: _id });

	User.findById(_id).then((user) => {
		user.refreshToken.push({ refreshToken });
		user.save((error: any, user: any) => {
			if (error) {
				return res.status(500).json({ error: error });
			}
		});
	});

	console.log(refreshToken)
	res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
	return res.status(200).json({ _id: _id, email: email, token });
};

export const refreshToken = (req: Request, res: Response) => {
	const { signedCookies = {} } = req;
	const { refreshToken } = signedCookies;

	if (refreshToken) {
		// console.log(refreshToken)
		try {
			const payload = jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN);
			const userId = payload["_id"];
			User.findOne({ _id: userId }).then((user) => {
				if (user) {
					// Find the refresh token against the user record in database
					const tokenIndex = user.refreshToken.findIndex(
						(item: { refreshToken: any }) => item.refreshToken === refreshToken
					);

					if (tokenIndex === -1) {
						res.statusCode = 401;
						res.send("refreshToken invalid");
					} else {
						const token = getToken({ _id: userId });
						// If the refresh token exists, then create new one and replace it.
						const newRefreshToken = getRefreshToken({ _id: userId });
						user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken };
						user.save((error: any, user: any) => {
							if (error) {
								res.statusCode = 500;
								res.send(error);
							} else {
								res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);
								res.send({ success: true, token });
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
