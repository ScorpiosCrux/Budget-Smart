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
	displayName: "Test",
	username: "Test",
	token: "",
};

interface UserContextType {
	isLoaded: boolean;
	userContext: User;
	updateContext: (key: string, value: string | boolean) => void;
	updateToken: (token: string) => void;
	setLocalStorage: () => void;
	loadLocalStorage: () => void;
}

// ! tells the consumers that it won't be null
export const UserContext = createContext<UserContextType>(null!);

type Props = {
	children: JSX.Element;
};

const UserContextProvider = ({ children }: Props) => {
	const [isLoaded, setIsLoaded] = useState<boolean>(false)
	const [userContext, setUserContext] = useState<User>(defaultState);

	const updateContext = (key: string, value: string | boolean) => {
		console.log("Updated UserContext");
		let prevState = userContext;
		prevState[key] = value;
		setUserContext(prevState);
	};

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

	const loadLocalStorage = () => {
		console.log("Use Effect User Context");
		const isUserLoggedIn = getLocalStorage("loggedIn");
		console.log(isUserLoggedIn);

		if (isUserLoggedIn === "true") {
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
					console.log("User Context Break!");
					setUserContext(defaultState);
					break;
				}
			}
			console.log("User Context Filled");
			console.log(userContext);
		} else {
			setUserContext(defaultState);
		}
	};

	/* This should be called? */
	useEffect(() => {
		loadLocalStorage();
	}, []);

	const updateToken = (token: string) => {
		userContext.token = token;
	};

	return (
		<UserContext.Provider value={{ isLoaded, userContext, updateContext, updateToken, setLocalStorage, loadLocalStorage }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
