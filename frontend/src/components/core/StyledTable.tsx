import { themes, typography } from "@/theme";
import styled from "styled-components";

const StyledTable = styled.table`
	tbody {
		display: grid;
		width: 100%;
		/* grid-template-columns: min-content 16ch auto auto 10ch min-content; */
		grid-template-columns: repeat(6, 1fr);
	}

	border-collapse: collapse;

	.table-header {
		border-bottom: 1px solid black;

		& th {
			padding: 0.5rem 0;
			font-size: ${typography.bold.fontSize};
			font-weight: ${typography.bold.fontWeight};
			text-align: left;
		}

		& .price {
			text-align: right;
		}
	}
`;

export const DraggableRow = styled.tr`
	max-height: 41px;
	height: 40px;
	border-bottom: 1px solid ${themes.light.background};

	.price {
		text-align: right;
	}

	.buttons {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 40px;
	}
`;

export default StyledTable;
