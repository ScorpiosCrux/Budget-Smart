import { themes, typography } from "@/theme";
import styled from "styled-components";

const StyledHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	& .main {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	& .header-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		max-height: 2rem;
		height: 2rem;
	}

	/* Creates Nested Style*/
	& .title {
		font-size: ${typography.title.fontSize};
		font-weight: ${typography.title.fontWeight};
	}

	& .helper-text {
		font-size: ${typography.regular.fontSize};
		font-weight: ${typography.regular.fontWeight};
		color: ${themes.light.secondaryBackground};
		margin: 0rem 1rem;
	}

	& .headerButtons {
		display: flex;
		gap: 0.5rem;
	}
`;

export default StyledHeader;
