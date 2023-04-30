import { themes } from "@/theme";
import { Button, TextField } from "@mui/material";
import { StyledH2 } from "@/components/core/StyledHeadings";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import styled from "styled-components";

import { useState } from "react";
import { ICategoryForm, IHandleCreateCategory } from "@/types";

const categorySchema = yup.object().shape({
	categoryName: yup.string().required("required"),
	budget: yup.number().required("required"),
});

const initialFormikValues = {
	categoryName: "",
	budget: 0,
};

interface Props {
	closeModal(): void;
	handleCreateCategory(props: IHandleCreateCategory): void;
}

/**
 * A category form that fits it's parent
 * @returns React Component for Category Forms
 */
const CategoryForm = (props: Props) => {
	const { closeModal, handleCreateCategory } = props;
	const [errorMsg, setErrorMsg] = useState<null | string>(null);

	const handleCreateCategoryHelper = async (
		values: ICategoryForm,
		{ setSubmitting }: FormikHelpers<ICategoryForm>
	) => {
		const { categoryName, budget } = values;
		setSubmitting(true);
		handleCreateCategory({ categoryName, budget });
		props.closeModal();
	};

	return (
		<CategoryFormContainer>
			<ModalHeader>
				<StyledH2>New Category</StyledH2>
			</ModalHeader>
			<ModalBody>
				<Formik
					initialValues={initialFormikValues}
					validationSchema={categorySchema}
					onSubmit={handleCreateCategoryHelper}>
					{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
						<FormContainer onSubmit={handleSubmit}>
							{errorMsg && <p>{errorMsg}</p>}
							<StyledMUITextField
								label="Category Name"
								type="text"
								id="categoryName"
								name="categoryName"
								onChange={handleChange}
								onBlur={handleBlur}
								error={Boolean(touched.categoryName) && Boolean(errors.categoryName)}
								helperText={
									Boolean(touched.categoryName) && Boolean(errors.categoryName)
										? touched.categoryName && errors.categoryName
										: " "
								}
								value={values.categoryName}
							/>

							<StyledMUITextField
								label="Budget"
								type="text"
								id="budget"
								name="budget"
								onChange={handleChange}
								onBlur={handleBlur}
								error={Boolean(touched.budget) && Boolean(errors.budget)}
								helperText={
									Boolean(touched.budget) && Boolean(errors.budget)
										? touched.budget && errors.budget
										: " "
								}
								value={values.budget}
							/>

							<ButtonContainer>
								<StyledMUIButton
									variant="outlined"
									disabled={isSubmitting}
									onClick={props.closeModal}
									sx={{ background: "red" }}>
									Cancel
								</StyledMUIButton>

								<StyledMUIButton
									variant="outlined"
									disabled={isSubmitting}
									type={"submit"}
									sx={{ background: themes.lightMode.accent.background }}>
									Add
								</StyledMUIButton>
							</ButtonContainer>
						</FormContainer>
					)}
				</Formik>
			</ModalBody>
		</CategoryFormContainer>
	);
};

export default CategoryForm;

const CategoryFormContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 2rem;
`;

const ModalHeader = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ModalBody = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
`;

const FormContainer = styled.form`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const ButtonContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	place-items: center;
	gap: 10%;
`;

const StyledMUITextField = styled(TextField)({
	width: "100%",

	"& label.Mui-focused": {
		color: themes.lightMode.accent.background,
	},
	// '& .MuiInput-underline:after': {
	//   borderBottomColor: 'green',
	// },
	"& .MuiOutlinedInput-root": {
		// '& fieldset': {
		//   borderColor: 'red',
		// },
		// '&:hover fieldset': {
		//   borderColor: 'yellow',
		// },
		"&.Mui-focused fieldset": {
			borderColor: themes.lightMode.accent.background,
		},
	},
});

const StyledMUIButton = styled(Button)({
	width: "100%",
	color: themes.lightMode.accent.text,
	border: 0,
	"&:hover": {
		background: themes.lightMode.secondaryBackground.background,
		border: 0,
	},
});
