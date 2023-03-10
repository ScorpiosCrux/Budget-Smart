import Navbar from "./Navbar";
import styled from "styled-components";
import { themes } from "@/theme";

type Props = {
	children: JSX.Element;
};

const Layout = ({ children }: Props) => {

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
