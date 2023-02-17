import { themes, typography } from "@/theme";
import styled from "styled-components";

const StyledSubHeader = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	padding: 0.5rem 0;
	border-bottom: 1px solid black;

	& span {
		color: ${themes.light.secondary};
		font-size: ${typography.regular.fontSize};
		font-weight: ${typography.regular.fontWeight};
	}
`;

export default StyledSubHeader;
