import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import * as yup from "yup";
import { Formik, FormikHelpers } from "formik";
import { useAuth } from "hooks/useAuth";

const loginSchema = yup.object().shape({
	email: yup.string().email().required("required"),
	password: yup.string().required("required"),
});

const initialValuesLogin = {
	email: "",
	password: "",
};

interface Values {
	email: string;
	password: string;
}

const Login = () => {
	const { login } = useAuth();
	const [errorMsg, setErrorMsg] = useState<null | string>(null);
	const router = useRouter();

	const handleLogin = async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
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
		<LoginWrapper>
			<Formik
				initialValues={initialValuesLogin}
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
						<h1>Sign In</h1>
						{errorMsg && <p>{errorMsg}</p>}
						<TextField
							label="Email"
							type="email"
							id="email"
							name="email"
							onChange={handleChange}
							onBlur={handleBlur}
							error={Boolean(touched.email) && Boolean(errors.email)}
							helperText={touched.email && errors.email}
							value={values.email}
						/>

						<TextField
							label="Password"
							type="password"
							id="password"
							onChange={handleChange}
							onBlur={handleBlur}
							error={Boolean(touched.password) && Boolean(errors.password)}
							helperText={touched.password && errors.password}
							value={values.password}
						/>
						<Button variant="outlined" disabled={isSubmitting} type={"submit"}>
							{isSubmitting ? "Logging In" : "Login"}
						</Button>
					</form>
				)}
			</Formik>
		</LoginWrapper>
	);
};

export default Login;

const LoginWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 20px;
	}
`;
