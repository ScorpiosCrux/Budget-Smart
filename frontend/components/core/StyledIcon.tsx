import { themes, typography } from "@/theme";
import styled from "styled-components";

interface Props {
	width: string;
	height: string;
	innerWidth: string;
	innerHeight: string;
}

const StyledIcon = (props: Props) => {
	return (
		<StyledIconWrapper width={props.width} height={props.height}>
			<StyledIconContent src="drag.svg" innerHeight={props.innerHeight} innerWidth={props.innerWidth} />
		</StyledIconWrapper>
	);
};

const StyledIconWrapper = styled.div<{ width: string; height: string }>`
	display: flex;
	justify-content: center;
	align-items: center;

	width: ${(props) => props.width};
	height: ${(props) => props.height};

	padding: 10px;
`;

const StyledIconContent = styled.img<{ innerWidth: string; innerHeight: string }>`
	object-fit: contain;
	width: ${(props) => props.innerWidth};
	height: ${(props) => props.innerHeight};
`;

export default StyledIcon;
