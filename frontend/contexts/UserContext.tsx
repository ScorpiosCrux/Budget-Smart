import React, { Component, createContext, useState } from "react";

interface UserContextType {
	userId: string;
	setUser: () => void;
}

const defaultState = {
	userId: "-1",
};

export const UserContext = createContext<UserContextType>(null!);

type Props = {
	children: JSX.Element;
};

const UserContextProvider = ({ children }: Props) => {
	const [userId, setUserId] = useState<string>(defaultState.userId);

	const setUser = () => {
		setUserId("23");
		console.log("Set User")
	};

	return <UserContext.Provider value={{ userId, setUser }}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
