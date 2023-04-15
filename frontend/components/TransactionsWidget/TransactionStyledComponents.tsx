import { themes, typography } from "@/theme";
import styled from "styled-components";

export const StyledTransactions = styled.div`
	padding: 0 1.5rem;
	overflow: hidden;
	.header {
		font-size: ${typography.bold.fontSize};
		font-weight: ${typography.bold.fontWeight};
	}

	.price {
		text-align: right;
	}
`;

export const StyledTransactionsHeader = styled.div`
	border-bottom: 2px solid black;
	height: 3rem;
`;

export const StyledTransactionsContainer = styled.div`
	height: calc(100% - 3rem);
	overflow-y: auto;
	display: grid;
	grid-auto-rows: 3rem;
`;

/* ========= Transaction Components =========*/

export const StyledTransactionWrapper = styled.div<{ isDragging: boolean }>`
	opacity: ${(p) => (p.isDragging ? 0.5 : 1)};
	cursor: move;
	height: 100%;
	border-bottom: 1px solid ${themes.light.background};
`;

export const StyledTransactionGrid = styled.div`
	height: 100%;
	width: 100%;
	display: grid;

	grid-template-columns: 11ch 3fr 2fr 12ch;

	& > div {
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		overflow-x: auto;
		margin-right: 1rem;
		/* Disable Scrollbar show */
		-ms-overflow-style: none; /* Internet Explorer 10+ */
		scrollbar-width: none; /* Firefox */
	}

	& > div::-webkit-scrollbar {
		display: none; /* Safari and Chrome */
	}

	& .price {
		display: flex;
		justify-content: end;
	}
`;

export const StyledTransactionsContent = styled.div`
	height: 660px;
	overflow-y: scroll;
`;
