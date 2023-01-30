import React, { Component, createContext, useState } from "react";

interface UserContextType {
	userId: string;
	setUser: (_id: string) => void;
}

const defaultState = {
	userId: "-1",
};

// ! tells the consumers that it won't be null
export const UserContext = createContext<UserContextType>(null!);

type Props = {
	children: JSX.Element;
};

const UserContextProvider = ({ children }: Props) => {
	const [userId, setUserId] = useState<string>(defaultState.userId);

	const setUser = (_id: string) => {
		setUserId(_id);
		console.log("Set User");
	};

	return <UserContext.Provider value={{ userId, setUser }}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
