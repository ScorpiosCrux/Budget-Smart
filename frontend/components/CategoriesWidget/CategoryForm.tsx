import { themes } from "@/theme";
import { Button, TextField } from "@mui/material";
import { StyledInputContainer } from "components/AuthWidgets/AuthWidgetStyledComponents";
import { StyledH2 } from "components/core/StyledHeadings";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import styled from "styled-components";

import { useState } from "react";

const categorySchema = yup.object().shape({
	categoryName: yup.string().required("required"),
	budget: yup.number().required("required"),
});

const initialFormikValues = {
	categoryName: "Category #Num",
	budget: 100,
};

interface FormValues {
	categoryName: string;
	budget: number;
}

interface Props {
	closeModal(): void;
	addCategory(categoryName: string, budget: number): void;
}

/**
 * A category form that fits it's parent
 * @returns React Component for Category Forms
 */
const CategoryForm = (props: Props) => {
	const [errorMsg, setErrorMsg] = useState<null | string>(null);

	// /* Handler Functions */
	// const handleLogin = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
	// 	setSubmitting(true);
	// 	const error = await login(values.email, values.password);
	// 	if (error) {
	// 		setErrorMsg(error);
	// 		setSubmitting(false);
	// 	} else {
	// 		router.push("/");
	// 	}
	// };

	const handleAddCategory = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
		setSubmitting(true);
		props.addCategory(values.categoryName, values.budget);
		console.log("test123432");
		props.closeModal()
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
					onSubmit={handleAddCategory}>
					{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
						<form onSubmit={handleSubmit}>
							<StyledInputContainer>
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
							</StyledInputContainer>

							{/* <Footer> */}
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
									Add Category
								</StyledMUIButton>
							{/* </Footer> */}
						</form>
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

const ModalBody = styled.div``;

const Footer = styled.div`
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
