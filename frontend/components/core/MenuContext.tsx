import { useEffect, useState } from "react";
import styled from "styled-components";

interface MenuItem {
	title: string;
	action: () => void;
	key: string,
}

interface Props {
	menuItems: MenuItem[];
	pageX: number;
	pageY: number;
}

const MenuContext = (props: Props) => {
	return (
		<MenuContextContainer left={props.pageX} top={props.pageY}>
			{props.menuItems.map((menuItem) => {
				return <MenuItem key={menuItem.key} onClick={menuItem.action}>{menuItem.title}</MenuItem>;
			})}
		</MenuContextContainer>
	);
};

const MenuContextContainer = styled.div<{ left: number; top: number }>`
	position: absolute;
	left: ${(props) => `${props.left}px`};
	/* left: 1000px; */
	top: ${(props) => `${props.top}px`};
	/* top: 300px; */

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
