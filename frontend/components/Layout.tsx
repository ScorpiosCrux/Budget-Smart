import axios from "axios";
import { UserContext } from "contexts/UserContext";
import { useCallback, useContext, useEffect } from "react";
import Navbar from "./Navbar";

type Props = {
	children: JSX.Element;
};

const Layout = ({ children }: Props) => {
	const { updateToken } = useContext(UserContext);

	const verifyUser = useCallback(() => {
		axios({
			method: "POST",
			withCredentials: true,
			url: process.env.NEXT_PUBLIC_API_ENDPOINT + "/auth/refreshToken",
		}).then((res) => {
			if (res.status === 200) {
				const token = res.data.token;
				updateToken(token);
			}
		}).catch((res) => {
			if (res.status === 401){
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
