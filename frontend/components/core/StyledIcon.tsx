import { themes, typography } from "@/theme";
import styled from "styled-components";

interface Props {
	size: string;
	innerWidth: string;
	innerHeight: string;
}

const StyledIcon = (props: Props) => {
	return (
		<StyledIconWrapper size={props.size}>
			<StyledIconContent src="drag.svg" innerHeight={props.innerHeight} innerWidth={props.innerWidth} />
		</StyledIconWrapper>
	);
};

const StyledIconWrapper = styled.div<{ size: string }>`
	display: flex;
	justify-content: center;
	align-items: center;

	width: ${(props) => props.size};
	height: ${(props) => props.size};
`;

const StyledIconContent = styled.img<{ innerWidth: string; innerHeight: string }>`
	object-fit: contain;
	width: ${(props) => props.innerWidth};
	height: ${(props) => props.innerHeight};
`;

export default StyledIcon;
