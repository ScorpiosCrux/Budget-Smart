import Link from "next/link";
import styled from "@emotion/styled";
import axios from "axios";
import { useContext } from "react";
import { themes } from "../src/theme.js";

import { UserContext } from "contexts/UserContext";

const Navbar = () => {
	const { userContext, setUserContext } = useContext(UserContext);

	return (
		<StyledNavbar>
			<div className="logo">
				<Link href={"/"}> SMART BUDGET </Link>
			</div>

			<div className="links">
				<div className="nav-button">
					<img src="home.svg" alt="home" />
				</div>

				<div className="nav-button">
					<img src="sort.svg" alt="home" />
				</div>
			</div>
			<UserLinks>
				{userContext._id !== "" ? (
					<>
						<NavLink href={"/user"}>{userContext._id}</NavLink>
						<NavLink href={"/logout"}>Logout</NavLink>
					</>
				) : (
					<>
						<NavLink href={"/login"}>Login</NavLink>
						<NavLink href={"/register"}>Register</NavLink>
						{console.log(userContext.token)}
					</>
				)}
			</UserLinks>
		</StyledNavbar>
	);
};

const UserLinks = styled.div`
	flex-grow: 1;
	flex-basis: 0%;
	display: flex;
	justify-content: end;
	align-items: center;
	gap: 5px;
`;

const NavLink = styled(Link)`
	font-weight: 200;
	font-size: 20px;
`;

const StyledNavbar = styled.nav`
	height: 60px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
	background-color: ${themes.light.accent};
	color: ${themes.light.background};

	& .logo {
		font-weight: 600;
		font-size: 48px;
		flex-grow: 1;
		flex-basis: 0%;
		font-family: "Inter";
		font-weight: 900;
		font-size: 27px;
	}

	& .links {
		display: flex;
		flex-direction: row;
		gap: 26px;
	}

	& .nav-button {
		width: 60px;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;

		:hover {
			cursor: pointer;
			background-color: #31d118;
			border-radius: 10px;
		}
	}
`;

export default Navbar;
