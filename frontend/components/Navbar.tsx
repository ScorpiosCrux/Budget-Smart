import Link from "next/link";
import styled from "@emotion/styled";
import axios from "axios";
import { useContext } from "react";

import { UserContext } from "contexts/UserContext";

const Navbar = () => {
	const { userContext, setUserContext } = useContext(UserContext);

	return (
		<Wrapper>
			<LogoWrapper>
				<Link href={"/"}> YYC Rents </Link>
			</LogoWrapper>
			<Links>
				{userContext._id !== "" ? (
					<>
						<NavLink href={"/dashboard"}>Dashboard</NavLink>
						<NavLink href={"/user"}>{userContext._id}</NavLink>
						{/* <NavLink href={"/" onclick={}}>Logout</NavLink> */}
					</>
				) : (
					<>
						<NavLink href={"/login"}>Login</NavLink>
						<NavLink href={"/register"}>Register</NavLink>
						{console.log(userContext.token)}
					</>
				)}
			</Links>
		</Wrapper>
	);
};

const LogoWrapper = styled.div`
	font-weight: 600;
	font-size: 48px;
	flex-grow: 1;
	flex-basis: 0%;
`;
const Links = styled.div`
	display: flex;
	gap: 10px;
`;

const NavLink = styled(Link)`
	font-weight: 200;
	font-size: 20px;
`;

const Wrapper = styled.nav`
	height: 72px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
`;

const ExternalLinks = styled.div`
	flex-grow: 1;
	flex-basis: 0%;
	display: flex;
	justify-content: end;
	align-items: center;
	gap: 5px;
`;

const Icon = styled.img<{ url: string }>`
	content: url(${(props) => props.url});
	aspect-ratio: 1;
	height: 25px;
	display: flex;
	align-items: center;
`;

export default Navbar;
