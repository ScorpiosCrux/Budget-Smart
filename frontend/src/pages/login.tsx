import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { UserContext } from "contexts/UserContext";
import * as yup from "yup";
import { Formik } from "formik";

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
	const { setUser } = useContext(UserContext);
	const router = useRouter();

	const login = (values: Values) => {
		axios({
			method: "post",
			data: {
				username: values.email,
				password: values.password,
			},
			withCredentials: true,
			url: "http://localhost:4000/api/auth/login",
		}).then((res) => {
			console.log(res.status);
			console.log(res.data);
			if (res.status === 200) {
				setUser(res.data._id);
				router.push("/");
			} else if (res.status === 401) {
				console.log("Username or Password incorrect!");
			}
		});
	};

	return (
		<LoginWrapper>
			<Formik initialValues={initialValuesLogin} validationSchema={loginSchema} onSubmit={login}>
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
