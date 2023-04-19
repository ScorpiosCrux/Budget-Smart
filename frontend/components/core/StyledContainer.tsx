import { themes } from "@/theme";
import styled from "styled-components";

interface Styles {
	width: string;
	height: string;
	padding?: string;
}

const StyledContainer = styled.div<Styles>`
	width: ${(props) => props.width};
	height: ${(props) => props.height};
	background-color: ${themes.light.primaryBackground};
	border-radius: 0.75rem;
	padding: ${(props) => (props.padding ? props.padding : "1.5rem")};
`;

export default StyledContainer;
