import axios from "axios";
import { UserContext } from "contexts/UserContext";
import { useCallback, useContext, useEffect } from "react";
import Navbar from "./Navbar";

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
		<div className="layout">
			<Navbar />
			<div className="content">{children}</div>
		</div>
	);
};

export default Layout;
