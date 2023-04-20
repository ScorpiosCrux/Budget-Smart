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
}

/**
 * Creates a popup
 */
const Modal = (props: Props) => {
	return (
		<ModalContainer>
			<StyledContainer width="400px" height="auto">
				<ModalContent>
					<ModalHeader>
						<StyledH2>
							{props.targetType === TargetType.Category ? "New Category" : "New Transaction"}
						</StyledH2>
					</ModalHeader>
					<ModalBody>
						<CategoryForm />
					</ModalBody>
					<ModalFooter>
						<Button
							variant="outlined"
							// disabled={isSubmitting}
							type={"submit"}
							onClick={props.closeModal}
							sx={{
								width: "100%",
								background: "red",
								color: themes.lightMode.accent.text,
								border: 0,
								"&:hover": {
									background: themes.lightMode.secondaryBackground.background,
									border: 0,
								},
							}}>
							{/* {isSubmitting ? "Adding Category" : "Add Category"} */}
							Cancel
						</Button>

						<Button
							variant="outlined"
							// disabled={isSubmitting}
							type={"submit"}
							sx={{
								width: "100%",
								background: themes.lightMode.accent.background,
								color: themes.lightMode.accent.text,
								border: 0,
								"&:hover": {
									background: themes.lightMode.secondaryBackground.background,
									border: 0,
								},
							}}>
							{/* {isSubmitting ? "Adding Category" : "Add Category"} */}
							Add Category
						</Button>
					</ModalFooter>
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
	grid-template-rows: 2fr 5fr 2fr;
	z-index: 2;
`;

const ModalHeader = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ModalBody = styled.div``;

const ModalFooter = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	place-items: center;
	gap: 10%;
`;
