import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";
import axios from "axios";

const Login = () => {
	const [registerUsername, setRegisterUsername] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");

	const register = () => {
		axios({
			method: "post",
			data: {
				registerUsername,
				registerPassword,
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
					type="text"
					autoComplete="current-email"
					onChange={(e) => setRegisterUsername(e.target.value)}
				/>
				<TextField
					id="password-input"
					label="Password"
					type="password"
					autoComplete="current-password"
					onChange={(e) => setRegisterPassword(e.target.value)}
				/>
				<Button variant="outlined" onClick={register}>
					Register
				</Button>
			</form>
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
