import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { useContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { UserContext } from "contexts/UserContext";

const Register = () => {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { setUser } = useContext(UserContext);

	const register = () => {
		axios({
			method: "post",
			data: {
				email,
				password,
			},
			withCredentials: true,
			url: "http://localhost:4000/api/auth/register",
		})
			.then((res) => {
				console.log(res);
				if (res.status === 201) {
					setUser(res.data._id);
					router.push("/");
				}
			})
			.catch((error) => {
				if (error.response.status === 409) console.log(error.response.data);
				else console.log(error.response.data);
			});
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
