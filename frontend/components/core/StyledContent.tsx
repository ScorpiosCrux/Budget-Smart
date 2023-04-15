import styled from "styled-components";

const StyledContent = styled.div`
	--numberOfCategoriesPerRow: 2;
	--numberOfCategoriesPerColumn: 5;
	--gap: 1rem;
	--headerSize: 2rem;

	height: 100%;
	display: grid;
	gap: 1rem;
	grid-template-rows: var(--headerSize) calc(100% - var(--headerSize) - var(--gap));
`;

export default StyledContent;
