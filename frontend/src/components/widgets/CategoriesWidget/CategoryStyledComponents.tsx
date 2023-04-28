
import { themes } from "@/theme";
import styled from "styled-components";

/* ========= Categories Components =========*/

export const StyledCategories = styled.div`
	display: grid;
	gap: inherit;
	grid-template-columns: repeat(2, 1fr);
	grid-auto-rows: min-content;
	overflow-y: auto;
	padding: 4px;
`;

/* ========= Category Components =========*/

export const StyledCategory = styled.div`
	width: 100%;
	height: 10rem;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	padding: 0rem 1rem;
	border-radius: 0.5rem;
	background-color: ${themes.light.primaryBackground};
	box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);

	& img {
		margin: 0px 6px 0px 6px;
		width: 25px;
		aspect-ratio: 1;
	}
`;

export const StyledCategoryHeader = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;

	& .title {
		text-transform: capitalize;
		font-weight: 600;
		font-size: 1rem;
	}

	& .info {
		height: 2.5rem;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		& img {
			width: 12px;
			aspect-ratio: 1;
		}
	}

	& .category-modifiers {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.category-modifiers > img {
		margin: 0;
	}
`;

export const StyledCategoryContent = styled.div<{ backgroundColor: string }>`
	width: 100%;
	height: 100%;
	background-color: ${(props) => props.backgroundColor};
`;

export const StyledCategoryInfo = styled.div`
	width: 100%;
	height: 100%;
	padding: 0.5rem;

	display: grid;
	grid-template-columns: 1fr 7ch;
	justify-content: end;
	align-items: center;
	gap: 0.5rem;

	& span {
		font-size: 0.875rem;
		overflow-x: auto;
		/* Disable Scrollbar show */
		-ms-overflow-style: none; /* Internet Explorer 10+ */
		scrollbar-width: none; /* Firefox */
	}

	& span::-webkit-scrollbar {
		display: none; /* Safari and Chrome */
	}

	.emphasize {
		font-weight: 700;
	}
`;

export const StyledCategoryDNDContainer = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
