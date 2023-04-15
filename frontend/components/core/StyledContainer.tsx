import { themes } from "@/theme";
import styled from "styled-components";

interface Props {
	width: string;
	height: string;
}

const StyledContainer = styled.div<Props>`
	width: ${props => props.width};
	height: ${props => props.height};;
	background-color: ${themes.light.primary};
	border-radius: 0.75rem;
	padding: 1.5rem;
`;

export default StyledContainer;
