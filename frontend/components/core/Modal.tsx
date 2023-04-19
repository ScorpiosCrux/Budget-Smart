import { useState } from "react";
import styled from "styled-components";
import StyledContainer from "./StyledContainer";


interface Props {
	closeModal() : void;
}

/**
 * Creates a popup
 */
const Modal = (props: Props) => {
	return (
		<ModalContainer>
			<StyledContainer width="400px" height="500px">
				<ModalContent>
					<ModalHeader>Add Transaction</ModalHeader>
					<ModalBody>Input fields go here</ModalBody>
					<ModalFooter onClick={props.closeModal}>Submit Button</ModalFooter>
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
	display: grid;
	grid-template-rows: 1fr 5fr 1fr;
	z-index: 2;
`;

const ModalHeader = styled.h2`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ModalBody = styled.div``;

const ModalFooter = styled.div``;
