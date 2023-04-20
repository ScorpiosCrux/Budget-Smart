import { useState } from "react";
import styled from "styled-components";
import StyledContainer from "./StyledContainer";
import { TargetType } from "@/types";
import { StyledH2 } from "./StyledHeadings";
import CategoryForm from "components/CategoriesWidget/CategoryForm";
import { Button } from "@mui/material";
import { themes } from "@/theme";
import { red } from "@mui/material/colors";

interface Props {
	closeModal(): void;
	targetType: TargetType;
	addCategory(categoryName: string, budget: number): void;
}

/**
 * Creates a popup
 */
const Modal = (props: Props) => {
	return (
		<ModalContainer>
			<StyledContainer width="400px" height="500px">
				<ModalContent>
					<CategoryForm closeModal={props.closeModal} addCategory={props.addCategory} />
				</ModalContent>
			</StyledContainer>
		</ModalContainer>
	);
};

export default Modal;

const ModalContainer = styled.div`
	position: fixed;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	display: grid;
	place-items: center;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 0;
`;

const ModalContent = styled.div`
	width: 100%;
	height: 100%;
`;
