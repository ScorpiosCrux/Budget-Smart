import React, { Component, createContext, useEffect, useState } from "react";

/* 
	Used to define the key type.
	If you use "?" then you might need to add "undefined"
*/
interface UserObjectKeys {
	[key: string]: any;
}

interface User extends UserObjectKeys {
	isLoggedIn: boolean;
	_id: string;
	email: string;
	displayName: string;
	username: string;
	token: string;
}

const defaultState: User = {
	isLoggedIn: false,
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
	resetLocalStorage: () => void;
	loadLocalStorage: () => void;
	setLocalStorage: () => void;
}

// ! tells the consumers that it won't be null
export const UserContext = createContext<UserContextType>(null!);

type Props = {
	children: JSX.Element;
};

const UserContextProvider = ({ children }: Props) => {
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [userContext, setUserContext] = useState<User>(structuredClone(defaultState));

	const updateContext = (key: string, value: string | boolean) => {
		let prevState = userContext;
		prevState[key] = value;
		setUserContext(prevState);
		console.log("Updated UserContext");
		console.log(userContext)
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

	const resetLocalStorage = () => {
		try {
			console.log("Clear Local Storage!")
			setUserContext(structuredClone(defaultState))
			window.localStorage.clear()
			console.log(userContext)
		} catch (error) {
			console.log("resetLocalStorage Error!");
		}
	}

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
		const isUserLoggedIn = getLocalStorage("isLoggedIn");
		if (isUserLoggedIn === "true") {
			// Make a copy of default state
			let context = structuredClone(defaultState);

			// Get values from local storage
			for (const key in context) {
				const value = getLocalStorage(key);
				if (value) {
					context[key] = value;
				} else {
					context = structuredClone(defaultState);
					break;
				}
			}
			setUserContext(context);
		} else {
			setUserContext(structuredClone(defaultState));
		}
		setIsLoaded(true);
	};

	useEffect(() => {
		console.log()
		loadLocalStorage();
	}, []);

	return (
		<UserContext.Provider
			value={{ isLoaded, userContext, updateContext, resetLocalStorage, setLocalStorage, loadLocalStorage }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
