import mongoose from "mongoose";
import passport from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true, // does not validate
	},
});

// Username and Password is added here.
UserSchema.plugin(passport);

export default mongoose.model("User", UserSchema)