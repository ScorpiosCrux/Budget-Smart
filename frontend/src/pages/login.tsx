import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "contexts/UserContext";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { userId, setUser } = useContext(UserContext);

	const login = () => {
		console.log("Login Request Sent!");
		axios({
			method: "post",
			data: {
				username,
				password,
			},
			withCredentials: true,
			url: "http://localhost:4000/login",
		}).then((res) => {
			if (res.data._id) {
				console.log("Set User");
				setUser(res.data._id);
			}
		});
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
					onChange={(e) => setUsername(e.target.value)}
				/>
				<TextField
					id="password-input"
					label="Password"
					type="password"
					autoComplete="current-password"
					onChange={(e) => setPassword(e.target.value)}
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
