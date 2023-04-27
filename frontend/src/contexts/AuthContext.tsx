import { IUser } from "@/types";
import { createContext, useState } from "react";

interface UserContext {
	user: IUser;
	setUser: (user: IUser) => void;
}

const defaultValue: UserContext = {
	user: {
		_id: "",
		email: "",
		displayName: "",
		token: "",
	},
	setUser: () => {},
};

export const UserContext = createContext<UserContext>(defaultValue);

/* 
	This defines the Props for AuthContextProvider.
	Specifically, allows us to wrap the Provider around child elements
 */
type Props = {
	children: JSX.Element;
};

/* 
	Default state for user state.
*/
const defaultState: IUser = {
	_id: "",
	email: "",
	displayName: "",
	token: "",
};

/* 
	Here we create the Provider that contains the actual state of the user
*/
export const AuthContextProvider = (props: Props) => {
	const [user, setUser] = useState<IUser>(defaultState);

	/* 
		All consumers that are descendants of a Provider will re-render whenever the
		Provider's value prop changes.

		Any custom hooks can call setUser and update the state of said user.
	 */
	return <UserContext.Provider value={{ user, setUser }}>{props.children}</UserContext.Provider>;
};
