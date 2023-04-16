import { useEffect, useState } from "react";
import styled from "styled-components";

interface MenuItem {
	title: string;
	action: () => void;
	key: string;
}

interface Props {
	menuItems: MenuItem[];
	pageX: number;
	pageY: number;
}

const MenuContext = (props: Props) => {
	/* Used to close the menu when user clicks anywhere else */
	useEffect(() => {
		const handleClick = () => {
			console.log("clicked");
			// setClicked(false);
		};

		document.addEventListener("click", handleClick);


		/* This runs when the component is "unmounted" */
		return () => {
			console.log("component dismount");
			document.removeEventListener("click", handleClick);

		};
	}, []);

	return (
		<MenuContextContainer left={props.pageX} top={props.pageY}>
			{props.menuItems.map((menuItem) => {
				return (
					<MenuItem key={menuItem.key} onClick={menuItem.action}>
						{menuItem.title}
					</MenuItem>
				);
			})}
		</MenuContextContainer>
	);
};

const MenuContextContainer = styled.div<{ left: number; top: number }>`
	position: absolute;
	left: ${(props) => `${props.left}px`};
	top: ${(props) => `${props.top}px`};

	background-color: grey;

	min-width: 300px;
	height: fit-content;
	border-radius: 0.5rem;
	padding: 1rem;
`;

const MenuItem = styled.div`
	border-bottom: 1px solid black;
	padding: 0.5rem;
`;

export default MenuContext;
