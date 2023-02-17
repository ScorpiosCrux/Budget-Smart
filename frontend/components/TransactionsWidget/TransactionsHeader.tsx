import { themes, typography } from "@/theme";
import styled from "styled-components";

const StyledTransactionsHeader = styled.div`
	border-bottom: 1px solid black;

	& > div > div {
		padding: 0.5rem 0;
		font-size: ${typography.bold.fontSize};
		font-weight: ${typography.bold.fontWeight};
		text-align: left;
	}
`;

export default StyledTransactionsHeader;
