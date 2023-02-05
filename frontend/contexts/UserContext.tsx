import React, { Component, createContext, useState } from "react";

interface User {
	_id: string;
	email: string;
	displayName: string;
	username: string;
	token: string;
}

const defaultState: User = {
	_id: "",
	email: "",
	displayName: "",
	username: "",
	token: "",
};

interface UserContextType {
	userContext: User;
	setUserContext: React.Dispatch<React.SetStateAction<User>>;
	updateToken: (token: string) => void;
}

// ! tells the consumers that it won't be null
export const UserContext = createContext<UserContextType>(null!);

type Props = {
	children: JSX.Element;
};

const UserContextProvider = ({ children }: Props) => {
	const [userContext, setUserContext] = useState<User>(defaultState);

	const updateToken = (token: string) => {
		userContext.token = token;
	};

	return <UserContext.Provider value={{ userContext, setUserContext, updateToken }}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
