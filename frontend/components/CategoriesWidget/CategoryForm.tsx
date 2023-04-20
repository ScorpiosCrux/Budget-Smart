import { themes } from "@/theme";
import { Button, TextField, withStyles } from "@mui/material";
import { StyledInputContainer } from "components/AuthWidgets/AuthWidgetStyledComponents";
import { StyledH1 } from "components/core/StyledHeadings";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useAuth } from "hooks/useAuth";
import { useState } from "react";

// const CssTextField = styled(TextField, {shouldForwardProp: (props) => props !== "focusColor",})
// ((p) => ({
// 	// input label when focused
// 	"& label.Mui-focused": {
// 		color: p.focusColor,
// 	},
// 	// focused color for input with variant='standard'
// 	"& .MuiInput-underline:after": {
// 		borderBottomColor: p.focusColor,
// 	},
// 	// focused color for input with variant='filled'
// 	"& .MuiFilledInput-underline:after": {
// 		borderBottomColor: p.focusColor,
// 	},
// 	// focused color for input with variant='outlined'
// 	"& .MuiOutlinedInput-root": {
// 		"&.Mui-focused fieldset": {
// 			borderColor: p.focusColor,
// 		},
// 	},
// }));

const categorySchema = yup.object().shape({
	categoryName: yup.string().required("required"),
	budget: yup.number().required("required"),
	email: yup.string().required("required"),
	password: yup.string().required("required"),
});

const initialFormikValues = {
	categoryName: "Category #Num",
	budget: 100,
	email: "",
	password: "",
};

interface FormValues {
	categoryName: string;
	budget: number;
	email: string;
	password: string;
}

/**
 * A category form that fits it's parent
 * @returns React Component for Category Forms
 */
const CategoryForm = () => {
	const router = useRouter();
	// const { login } = useAuth();
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

	return (
		<CategoryFormContainer>
			<Formik
				initialValues={initialFormikValues}
				validationSchema={categorySchema}
				onSubmit={() => {
					console.log("test");
				}}>
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
						{/* <Button
							variant="outlined"
							disabled={isSubmitting}
							type={"submit"}
							sx={{
								background: themes.lightMode.accent.background,
								color: themes.lightMode.accent.text,
								border: 0,
								"&:hover": {
									background: themes.lightMode.secondaryBackground.background,
									border: 0,
								},
							}}>
							{isSubmitting ? "Adding Category" : "Add Category"}
						</Button> */}
						{/* <Button
									height="2rem"
									text={isSubmitting ? "Logging In" : "Log In"}
									isDisabled={isSubmitting}
									backgroundColor={themes.lightMode.accent.background}
									textColor={themes.lightMode.accent.text}
									padding="1.5rem"
								/> */}
					</form>
				)}
			</Formik>
		</CategoryFormContainer>
	);
};

export default CategoryForm;

const CategoryFormContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	gap: 2rem;
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
