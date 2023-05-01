import { themes } from "@/theme";
import { Button, TextField } from "@mui/material";
import { StyledH2 } from "@/components/core/StyledHeadings";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import styled from "styled-components";
import { useState } from "react";
import { DatePickerField } from "@/components/core/DatePicker";

const transactionSchema = yup.object().shape({
	date: yup.string().required("required"),
	description: yup.string().required("required"),
	price: yup.number().required("required"),
});

const initialFormikValues = {
	date: "",
	description: "",
	price: 0,
};

interface FormValues {
	date: string;
	description: string;
	price: number;
}

interface Props {
	closeModal(): void;
	addCategory(categoryName: string, budget: number): void;
}

/**
 * A category form that fits it's parent
 * @returns React Component for Category Forms
 */
const TransactionForm = (props: Props) => {
	const [errorMsg, setErrorMsg] = useState<null | string>(null);

	const handleAddTransaction = async (
		values: FormValues,
		{ setSubmitting }: FormikHelpers<FormValues>
	) => {
		setSubmitting(true);
		// props.addCategory(values.date, values.description, values.price);
		console.log("test123432");
		props.closeModal();
	};

	return (
		<CategoryFormContainer>
			<ModalHeader>
				<StyledH2>New Transaction</StyledH2>
			</ModalHeader>
			<ModalBody>
				<Formik
					initialValues={initialFormikValues}
					validationSchema={transactionSchema}
					onSubmit={handleAddTransaction}>
					{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
						<FormContainer onSubmit={handleSubmit}>
							{errorMsg && <p>{errorMsg}</p>}

							<DatePickerField name="Test1" />

							{/* <DatePicker
								label="Date"
								onChange={handleChange}
								value={values.date}
							>
							</DatePicker> */}

							{/* <StyledMUITextField
								label="Date"
								type="text"
								id="date"
								name="date"
								onChange={handleChange}
								onBlur={handleBlur}
								error={Boolean(touched.date) && Boolean(errors.date)}
								helperText={
									Boolean(touched.date) && Boolean(errors.date) ? touched.date && errors.date : " "
								}
								value={values.date}
							/> */}

							<StyledMUITextField
								label="Description"
								type="text"
								id="description"
								name="description"
								onChange={handleChange}
								onBlur={handleBlur}
								error={Boolean(touched.description) && Boolean(errors.description)}
								helperText={
									Boolean(touched.description) && Boolean(errors.description)
										? touched.description && errors.description
										: " "
								}
								value={values.description}
							/>

							<StyledMUITextField
								label="Price"
								type="text"
								id="price"
								name="price"
								onChange={handleChange}
								onBlur={handleBlur}
								error={Boolean(touched.price) && Boolean(errors.price)}
								helperText={
									Boolean(touched.price) && Boolean(errors.price)
										? touched.price && errors.price
										: " "
								}
								value={values.price}
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

export default TransactionForm;

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
