import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";
import { useRouter } from "next/router";
import * as yup from "yup";
import { Formik, FormikHelpers } from "formik";
import { useAuth } from "@/hooks/useAuth";
import StyledContainer from "@/components/core/StyledContainer";
import { StyledPageContent } from "@/components/core/StyledPageContent";
import {
	AuthContent,
	StyledInputContainer,
} from "@/components/widgets/AuthWidgets/AuthWidgetStyledComponents";
import { StyledH1 } from "@/components/core/StyledHeadings";
import { themes } from "@/theme";

const loginSchema = yup.object().shape({
	email: yup.string().email().required("required"),
	password: yup.string().required("required"),
});

const initialFormikValues = {
	email: "",
	password: "",
};

interface FormValues {
	email: string;
	password: string;
}

const Login = () => {
	/* Hooks */
	const router = useRouter();
	const { login } = useAuth();
	const [errorMsg, setErrorMsg] = useState<null | string>(null);

	/* Handler Functions */
	const handleLogin = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
		setSubmitting(true);
		const error = await login(values.email, values.password);
		if (error) {
			setErrorMsg(error);
			setSubmitting(false);
		} else {
			router.push("/");
		}
	};

	return (
		<StyledPageContent>
			<StyledContainer width="400px" height="400px" padding="3rem">
				<AuthContent>
					<Formik
						initialValues={initialFormikValues}
						validationSchema={loginSchema}
						onSubmit={handleLogin}>
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
									{isSubmitting ? "Logging In" : "Log In"}
								</Button>
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
				</AuthContent>
			</StyledContainer>
		</StyledPageContent>
	);
};

export default Login;
