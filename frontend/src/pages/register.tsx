import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";

const Login = () => {
	const [registerUsername, setRegisterUsername] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");

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
				<Button variant="outlined">Register</Button>
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
