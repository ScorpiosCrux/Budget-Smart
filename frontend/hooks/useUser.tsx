import { AuthContext } from "contexts/AuthContext";
import { useContext } from "react";
import { useLocalStorage } from "./useLocalStorage";

export interface User {
	isLoggedIn: false;
	_id: "";
	email: "";
	displayName: "Test";
	username: "Test";
	token: "";
}

export const useUser = () => {
	const { user, setUser } = useContext(AuthContext);
	const { setItem } = useLocalStorage();

	const addUser = (user: User) => {
		setUser(user);
		setItem("user", JSON.stringify(user));
	};

	const removeUser = () => {
		setUser(null);
		setItem("user", "");
	};

	return {user, addUser, removeUser}
};
