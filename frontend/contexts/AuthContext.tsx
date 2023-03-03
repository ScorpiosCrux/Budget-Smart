import { AuthUser } from "@/types";
import { createContext, useState } from "react";

interface AuthContext {
	user: AuthUser | null;
	setUser: (user: AuthUser | null) => void;
}

const defaultValue: AuthContext = {
	user: null,
	setUser: () => {},
};

export const AuthContext = createContext<AuthContext>(defaultValue);

/* 
	This defines the Props for AuthContextProvider.
	Specifically, allows us to wrap the Provider around child elements
 */
type Props = {
	children: JSX.Element;
};

/* 
	Here we create the Provider that contains the actual state of the user
*/
export const AuthContextProvider = (props: Props) => {
	const [user, setUser] = useState<AuthUser | null>({
		isLoggedIn: false,
		_id: "",
		email: "",
		displayName: "Test",
		username: "Test",
		token: "",
	});

	/* 
		All consumers that are descendants of a Provider will re-render whenevser the
		Provider's value prop changes.

		Any custom hooks can call setUser and update the state of said user.
	 */
	return <AuthContext.Provider value={{ user, setUser }}>{props.children}</AuthContext.Provider>;
};
