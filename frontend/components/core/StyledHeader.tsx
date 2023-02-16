import { themes, typography } from "@/theme";
import styled from "styled-components";

const StyledHeader = styled.div`
	display: flex;
	align-items: center;
	padding-bottom: 15px;

	/* Creates Nested Style*/
	& .title {
		font-size: ${typography.title.fontSize};
		font-weight: ${typography.title.fontWeight};
	}

	& .helper-text {
		font-size: ${typography.regular.fontSize};
		font-weight: ${typography.regular.fontWeight};
		color: ${themes.light.secondary};
		margin: 0rem 1rem;
	}
`;

export default StyledHeader;
