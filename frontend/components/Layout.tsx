import axios from "axios";
import { UserContext } from "contexts/UserContext";
import { useCallback, useContext, useEffect } from "react";
import Navbar from "./Navbar";
import styled from "styled-components";
import { themes } from "@/theme";

type Props = {
	children: JSX.Element;
};

const Layout = ({ children }: Props) => {
	const { isLoaded, userContext, resetLocalStorage } = useContext(UserContext);

	const verifyUser = useCallback(() => {
		/* 
			First request is to /refreshToken where it uses the refreshToken in 
			cookies. The second request needs to be authenticated using the JWT
			that is stored in the User Context
		*/
		axios({
			method: "POST",
			withCredentials: true,
			url: process.env.NEXT_PUBLIC_API_ENDPOINT + "/auth/refreshToken",
		})
			.then((res) => {
				console.log("Refresh Token Valid");
			})
			.catch((error) => {
				console.log("Refresh Token invalid1");
				console.log(error)
				if (error.response.status === 401 || error.response.status === 500) {
					console.log("Erorr123");

					resetLocalStorage();
					// get user to login again and clear the context
				}
				console.log("Erorr");
			});
	}, []);

	useEffect(() => {
		if (isLoaded) {
			console.log("isLoaded");
			if (userContext.isLoggedIn) {
				verifyUser();
			} else {
				console.log("User Not Logged in! Skipping refresh Token Check");
			}
		} else {
			console.log("notLoaded");
		}
	}, [isLoaded, userContext]);

	return (
		<StyledLayout>
			<Navbar />
			<div className="content">{children}</div>
		</StyledLayout>
	);
};

export default Layout;

const StyledLayout = styled.div`
	background-color: ${themes.light.background};
	min-height: 100vh;
	display: flex;
	flex-direction: column;

	& .content {
		display: flex;
		flex-grow: 1;
		justify-content: center;
	}
`;
