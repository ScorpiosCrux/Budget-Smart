import { useState } from "react";
import styled from "styled-components";
import StyledContainer from "./StyledContainer";
import { IHandleCreateCategory, TargetType } from "@/types";
import CategoryForm from "@/components/widgets/CategoriesWidget/CategoryForm";
import TransactionForm from "@/components/widgets/TransactionsWidget/TransactionForm";

interface Props {
	closeModal(): void;
	targetType: TargetType;
	handleCreateCategory?(props: IHandleCreateCategory): void;
	addTransaction?(): void;
}

/**
 * Creates a popup
 */
const Modal = (props: Props) => {
	const { handleCreateCategory } = props;
	return (
		<ModalContainer>
			<StyledContainer width="400px" height="auto">
				<ModalContent>
					{props.targetType === TargetType.Category ? (
						<CategoryForm closeModal={props.closeModal} handleCreateCategory={handleCreateCategory!} />
					) : (
						<TransactionForm closeModal={props.closeModal} addCategory={props.addTransaction!} />
					)}
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
