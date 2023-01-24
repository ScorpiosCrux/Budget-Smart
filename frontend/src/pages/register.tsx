import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";
import axios from "axios";

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const register = () => {
		axios({
			method: "post",
			data: {
				email,
				password,
			},
			withCredentials: true,
			url: "http://localhost:4000/register",
		}).then((res) => console.log(res));
	};

	return (
		<LoginWrapper>
			<form action="/login" method="post">
				<h1>Register</h1>
				<TextField
					id="username-input"
					label="Email"
					type="email"
					autoComplete="current-email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<TextField
					id="password-input"
					label="Password"
					type="password"
					autoComplete="current-password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button variant="outlined" onClick={register}>
					Register
				</Button>
			</form>
		</LoginWrapper>
	);
};

export default Register;

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
