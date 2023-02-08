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
	const { userContext, updateToken } = useContext(UserContext);

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
				
			})
			.catch((res) => {
				if (res.status === 401) {
					// get user to login again and clear the context
				}
			});
	}, [updateToken]);

	useEffect(() => {
		verifyUser();
	}, [verifyUser]);

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
`

