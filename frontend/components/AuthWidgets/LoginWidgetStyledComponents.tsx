import styled from "styled-components";

export const LoginContent = styled.div`
	height: 100%;
	width: 100%;

	display: flex;
	justify-content: center;
	align-items: center;

	& form {
		width: 100%;
		height: 100%;

		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		gap: 20px;
	}
`;

export const StyledInputContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 5px;
`;
