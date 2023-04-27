import Navbar from "./Navbar";
import styled from "styled-components";
import { themes } from "@/theme";
import { useContext, useEffect } from "react";
import { UserContext } from "@/contexts/AuthContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { IUser } from "@/types";

interface Props {
	children: JSX.Element;
}

const Layout = ({ children }: Props) => {
	const { setUser } = useContext(UserContext);
	const { getItem } = useLocalStorage();

	useEffect(() => {
		const userRaw = getItem("user");
		if (userRaw) {
			const user: IUser = JSON.parse(userRaw);
			setUser(user);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
