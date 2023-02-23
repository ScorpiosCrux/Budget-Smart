import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { UserContext } from "contexts/UserContext";
import * as yup from "yup";
import { Formik, FormikHelpers } from "formik";

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
	const { userContext, updateContext, setLocalStorage } = useContext(UserContext);
	const [errorMsg, setErrorMsg] = useState<null | string>(null);
	const router = useRouter();

	const login = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
		axios({
			method: "post",
			data: {
				username: values.email,
				password: values.password,
			},
			withCredentials: true,
			url: process.env.NEXT_PUBLIC_API_ENDPOINT + "/auth/login",
		})
			.then((res) => {
				console.log("Data: ");
				console.log(res.data);
				if (res.status === 200) {
					for (const key in res.data) {
						console.log(key)
						console.log(res.data[key])
						updateContext(key, res.data[key]);
					}
					updateContext("loggedIn", true);
					console.log(userContext);
					setLocalStorage();
					router.push("/");
				} else {
					console.log("Some Error as Occured!");
				}
			})
			.catch((error) => {
				setErrorMsg("Username or Password incorrect!");
				setSubmitting(false);
			});
	};

	return (
		<LoginWrapper>
			<Formik initialValues={initialValuesLogin} validationSchema={loginSchema} onSubmit={login}>
				{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
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
