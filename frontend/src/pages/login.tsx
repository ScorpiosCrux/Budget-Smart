import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";

const Login = () => {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);


	return (
		<LoginWrapper>
			<form action="/login" method="post">
				<h1>Sign In</h1>
				<TextField id="username-input" label="Email" type="text" autoComplete="current-email" />
				<TextField id="password-input" label="Password" type="password" autoComplete="current-password" />
				<Button variant="outlined" >Login</Button>
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
