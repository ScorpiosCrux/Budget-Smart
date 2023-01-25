

// module.exports.isLoggedIn = (req: Request, res: Response, next: any) => {
// 	if (!req.isAuthenticated()) {
// 		req.session.returnTo = req.originalUrl;
// 		req.flash("error", "You must be signed in to see this page.");
// 		return res.redirect("/login");
// 	}
// 	next();
// };
