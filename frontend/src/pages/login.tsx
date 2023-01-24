import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";
import axios from "axios";

const Login = () => {
	const [loginUsername, setLoginUsername] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	const login = () => {
		axios({
			method: "post",
			data: {
				loginUsername,
				loginPassword,
			},
			withCredentials: true,
			url: "http://localhost:4000/login",
		}).then((res) => console.log(res));
	};

	return (
		<LoginWrapper>
			<form action="/login" method="post">
				<h1>Sign In</h1>
				<TextField
					id="username-input"
					label="Email"
					type="text"
					autoComplete="current-email"
					onChange={(e) => setLoginUsername(e.target.value)}
				/>
				<TextField
					id="password-input"
					label="Password"
					type="password"
					autoComplete="current-password"
					onChange={(e) => setLoginPassword(e.target.value)}
				/>
				<Button variant="outlined" onClick={login}>
					Login
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
