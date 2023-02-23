import React, { Component, createContext, useEffect, useState } from "react";

/* 
	Used to define the key type.
	If you use "?" then you might need to add "undefined"
*/
interface UserObjectKeys {
	[key: string]: string | boolean;
}

interface User extends UserObjectKeys {
	loggedIn: boolean;
	_id: string;
	email: string;
	displayName: string;
	username: string;
	token: string;
}

const defaultState: User = {
	loggedIn: false,
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
	setLocalStorage: () => void;
}

// ! tells the consumers that it won't be null
export const UserContext = createContext<UserContextType>(null!);

type Props = {
	children: JSX.Element;
};

const UserContextProvider = ({ children }: Props) => {
	const [userContext, setUserContext] = useState<User>(defaultState);

	const setLocalStorage = () => {
		try {
			for (const key in userContext) {
				const value = userContext[key].toString();
				window.localStorage.setItem(key, value);
			}
		} catch (error) {
			console.log("setLocalStorage Error!");
		}
	};

	const getLocalStorage = (key: string) => {
		try {
			const value = window.localStorage.getItem(key);
			return value;
		} catch (error) {
			console.log("getLocalStorage error!");
			return null;
		}
	};

	useEffect(() => {
		const isUserLoggedIn = getLocalStorage("isLoggedIn");
		if (isUserLoggedIn) {
			// Make a copy of default state
			let localStorageContext: User = Object.assign({}, defaultState);

			// Get values from local storage
			for (const key in localStorageContext) {
				const value = getLocalStorage(key);
				if (value) {
					localStorageContext[key] = value;
				}

				// if a value is null, reset userContext
				else {
					setUserContext(defaultState);
					break;
				}
			}
		} else {
			setUserContext(defaultState);
		}
	});

	const updateToken = (token: string) => {
		userContext.token = token;
	};

	return (
		<UserContext.Provider value={{ userContext, setUserContext, updateToken, setLocalStorage }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
