import styled from "styled-components";
import { StaticImageData } from "next/image";
import StyledIcon from "components/core/StyledIcon";
import { themes } from "@/theme";
import React from "react";

interface Styles {
	width?: string;
	height?: string;
	icon?: StaticImageData;
	iconAltText?: string;
	text?: string;
	textColor?: string;
	isSquare?: boolean;
	isDisabled?: boolean;
	onClick?(props: any): void;
	backgroundColor?: string;
	padding?: string;
}

/**
 *	A generic React button component.
 * @param props - properties of the button.
 * @returns a button with specified properties.
 */
const Button = (props: Styles) => {
	return (
		<ButtonContainer
			width={props.width}
			height={props.height}
			isSquare={props.isSquare}
			onClick={props.onClick}
			backgroundColor={props.backgroundColor}
			textColor={props.textColor}
			padding={props.padding}
			isDisabled={props.isDisabled}>
			{props.icon && (
				<StyledIcon
					image={props.icon}
					alt={props.iconAltText ? props.iconAltText : ""}
					width="1.25rem"
				/>
			)}
			{props.text && <span>{props.text}</span>}
		</ButtonContainer>
	);
};

/**
 * A styled component for contains all the parts of the button.
 */
const ButtonContainer = styled.div<Styles>`
	display: flex;
	align-items: center;
	justify-content: center;
	${(props) => props.isSquare && `aspect-ratio: 1`};

	${(props) => props.width && `width: ${props.width}`};
	${(props) => props.height && `height: ${props.height}`};

	border-radius: 0.25rem;
	${(props) => props.backgroundColor && `background-color: ${props.backgroundColor}`};
	${(props) =>
		props.isDisabled && `background-color: ${themes.lightMode.secondaryBackground.background}`};

	${(props) => props.textColor && `color: ${props.textColor}`};

	${(props) => props.padding && `padding: ${props.padding}`};

	:hover {
		cursor: pointer;
		background-color: ${themes.light.secondaryBackground};
	}

	-webkit-touch-callout: none; /* iOS Safari */
	-webkit-user-select: none; /* Safari */
	-khtml-user-select: none; /* Konqueror HTML */
	-moz-user-select: none; /* Old versions of Firefox */
	-ms-user-select: none; /* Internet Explorer/Edge */
	user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
`;

export default Button;
