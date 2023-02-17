import { themes } from "@/theme";
import styled from "styled-components";

export const CategoryInfo = styled.div`
	display: grid;
	grid-template-columns: 70% 30%;
	justify-content: end;
	gap: 0.5rem;

	& span {
		text-align: end;
		font-size: 0.75rem;
	}

	.emphasize {
		font-weight: 700;
	}
`;

export const CategoryDNDHelper = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
