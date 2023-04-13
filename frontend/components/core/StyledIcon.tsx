import { themes, typography } from "@/theme";
import styled from "styled-components";

interface Props {
	src: string;
	width?: string;
	height?: string;
	innerWidth: string;
	innerHeight: string;
	onClick?(): void;
}

const StyledIcon = (props: Props) => {
	return (
		<StyledIconWrapper width={props.width} height={props.height} onClick={props.onClick}>
			<StyledIconContent
				src={props.src}
				innerHeight={props.innerHeight}
				innerWidth={props.innerWidth}
			/>
		</StyledIconWrapper>
	);
};

const StyledIconWrapper = styled.div<{ width?: string; height?: string }>`
	display: flex;
	justify-content: center;
	align-items: center;

	aspect-ratio: 1;

	${(props) => props.width && !props.height && `width: ${props.width}`}
	${(props) => !props.width && props.height && `height: ${props.height}`}
	${(props) => !props.width && !props.height && `height: 1rem`}
`;

const StyledIconContent = styled.img<{ innerWidth: string; innerHeight: string }>`
	object-fit: contain;
	width: ${(props) => props.innerWidth};
	height: ${(props) => props.innerHeight};
`;

export default StyledIcon;
