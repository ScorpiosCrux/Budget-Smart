import { useAuth } from "hooks/useAuth";
import { User } from "hooks/useUser";
import { createContext } from "react";
import { UserContext } from "./UserContext";

interface AuthContext {
	user: User | null;
	login: (user: User) => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContext>({
	user: null,
	login: () => {},
	logout: () => {},
});

type Props = {
	children: JSX.Element;
};

export const AuthContextProvider = (props: Props) => {
	const { user, login, logout } = useAuth();

	return <AuthContext.Provider value={{ user, login, logout }}>{props.children}</AuthContext.Provider>;
};
