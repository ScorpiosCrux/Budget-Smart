import styled from "styled-components";
import { StaticImageData } from "next/image";
import StyledIcon from "components/core/StyledIcon";
import { themes } from "@/theme";

interface Props {
	width?: string;
	height?: string;
	icon?: StaticImageData;
	text?: string;
	isSquare?: boolean;
	onClick?(props: any): void;
}

const Button = (props: Props) => {
	return (
		<ButtonContainer
			width={props.width}
			height={props.height}
			isSquare={props.isSquare}
			onClick={props.onClick}>
			{props.icon && <StyledIcon image={props.icon} alt="deleteIcon" width="1.25rem" />}
			{props.text && <span>{props.text}</span>}
		</ButtonContainer>
	);
};

const ButtonContainer = styled.div<{ width?: string; height?: string; isSquare?: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	${(props) => props.isSquare && `aspect-ratio: 1`};

	${(props) => props.width && `width: ${props.width}`};
	${(props) => props.height && `height: ${props.height}`};

	border-radius: 0.25rem;

	:hover {
		cursor: pointer;
		background-color: ${themes.light.secondary};
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
