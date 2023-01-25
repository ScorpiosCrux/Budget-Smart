import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";
import axios from "axios";

const Profile = () => {
	const getUser = () => {
		axios({
			method: "GET",
			withCredentials: true,
			url: "http://localhost:4000/user",
		}).then((res) => console.log(res));
	};

	return (
		<>
			<h1>User is:</h1>
			<p></p>
			<Button variant="outlined" onClick={getUser}>
				Get User Info
			</Button>
		</>
	);
};

export default Profile;

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
