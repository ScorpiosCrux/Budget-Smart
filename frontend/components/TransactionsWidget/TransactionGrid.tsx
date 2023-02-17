import { themes, typography } from "@/theme";
import styled from "styled-components";

const TransactionGrid = styled.div`
	width: 100%;
	display: grid;

	grid-template-columns: [drag] 1fr [date] 2fr [description] 3fr [category] 2fr [price] 2fr [modifiers] 1.5fr [end];

	& > div {
		max-height: 2.5rem;
		height: 2.5rem;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	& .drag {
		grid-column: drag/date;
		justify-content: center;
	}

	& .date {
		grid-column: date/description;
	}

	& .description {
		grid-column: description/category;
	}

	& .category {
		grid-column: category/price;
	}

	& .price {
		grid-column: price/modifiers;
		display: flex;
		justify-content: end;
	}

	& .modifiers {
		grid-column: modifiers/end;
		justify-content: space-evenly;
	}
`;

export default TransactionGrid;
