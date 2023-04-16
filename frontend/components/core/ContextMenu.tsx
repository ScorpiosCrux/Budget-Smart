import { useEffect, useState } from "react";
import { themes, typography } from "@/theme";
import styled from "styled-components";

import StyledIcon from "./StyledIcon";
import { StaticImageData } from "next/image";

interface MenuItem {
	title: string;
	icon?: StaticImageData;
	action: () => void;
	key: string;
}

interface Props {
	menuItems: MenuItem[];
	pageX: number;
	pageY: number;
}

const ContextMenu = (props: Props) => {
	return (
		<MenuContextContainer left={props.pageX} top={props.pageY}>
			{props.menuItems.map((menuItem) => {
				return (
					<MenuItem key={menuItem.key} onClick={menuItem.action}>
						{menuItem.icon && <StyledIcon image={menuItem.icon} alt="deleteIcon" width="1rem" />}
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

	box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
	background-color: white;

	height: fit-content;
	border-radius: 0.5rem;
	padding: 1rem 0;
`;

const MenuItem = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.5rem 1rem;

	:hover {
		cursor: pointer;
		background-color: ${themes.light.secondary};
	}
`;

export default ContextMenu;
