import mongoose from "mongoose";
import passport from "passport-local-mongoose";

const SessionSchema = new mongoose.Schema({
	refreshToken: {
	  type: String,
	  default: "",
	},
  })

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true, // does not validate
	},
	displayName: {
		type: String,
		default: "",
	},
	authStrategy: {
		type: String,
		default: "local"
	},
	refreshToken: {
		type: [SessionSchema], // supports multiple sign ins from multiple devices at the same time
	}
});

UserSchema.set("toJSON", {
	transform: function (doc, ret, options) {
		delete ret.refreshToken
		return ret
	}
})

// Username and Password is added here.
UserSchema.plugin(passport);

export default mongoose.model("User", UserSchema)