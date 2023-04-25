import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import { StyledPageContent } from "@/components/core/StyledPageContent";
import StyledContainer from "@/components/core/StyledContainer";
import {
	AuthContent,
	StyledInputContainer,
} from "@/components/widgets/AuthWidgets/AuthWidgetStyledComponents";
import { StyledH1 } from "@/components/core/StyledHeadings";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { themes } from "@/theme";

const registerSchema = yup.object().shape({
	displayName: yup.string().required("required"),
	email: yup.string().email().required("required"),
	password: yup.string().required("required"),
});

interface FormValues {
	displayName: string;
	email: string;
	password: string;
}

const initialFormikValues = {
	displayName: "",
	email: "",
	password: "",
};

const Register = () => {
	/* Hooks */
	const { register } = useAuth();
	const router = useRouter();
	const [errorMsg, setErrorMsg] = useState<null | string>(null);

	const handleRegister = async (
		values: FormValues,
		{ setSubmitting }: FormikHelpers<FormValues>
	) => {
		setSubmitting(true);
		const error = await register(values.displayName, values.email, values.password);
		if (error) {
			setErrorMsg(error);
			setSubmitting(false);
		} else {
			router.push("/");
		}
	};

	return (
		<StyledPageContent>
			<StyledContainer width="400px" height="500px" padding="3rem">
				<AuthContent>
					<Formik
						initialValues={initialFormikValues}
						validationSchema={registerSchema}
						onSubmit={handleRegister}>
						{({
							values,
							errors,
							touched,
							handleChange,
							handleBlur,
							handleSubmit,
							isSubmitting,
						}) => (
							<form onSubmit={handleSubmit}>
								<StyledH1>SMART BUDGET</StyledH1>

								<StyledInputContainer>
									{errorMsg && <p>{errorMsg}</p>}

									<TextField
										label="Display name"
										type="text"
										id="displayName"
										name="displayName"
										onChange={handleChange}
										onBlur={handleBlur}
										error={Boolean(touched.displayName) && Boolean(errors.displayName)}
										helperText={
											Boolean(touched.displayName) && Boolean(errors.displayName)
												? touched.displayName && errors.displayName
												: " "
										}
										value={values.displayName}
										sx={{
											width: "100%",
										}}
									/>

									<TextField
										label="Email"
										type="email"
										id="email"
										name="email"
										onChange={handleChange}
										onBlur={handleBlur}
										error={Boolean(touched.email) && Boolean(errors.email)}
										helperText={
											Boolean(touched.email) && Boolean(errors.email)
												? touched.email && errors.email
												: " "
										}
										value={values.email}
										sx={{
											width: "100%",
										}}
									/>

									<TextField
										label="Password"
										type="password"
										id="password"
										onChange={handleChange}
										onBlur={handleBlur}
										error={Boolean(touched.password) && Boolean(errors.password)}
										helperText={
											Boolean(touched.password) && Boolean(errors.password)
												? touched.password && errors.password
												: " "
										}
										value={values.password}
										sx={{
											width: "100%",
										}}
									/>
								</StyledInputContainer>
								<Button
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
									{isSubmitting ? "Registering" : "Register"}
								</Button>
							</form>
						)}
					</Formik>
				</AuthContent>
			</StyledContainer>
		</StyledPageContent>
	);
};

export default Register;
