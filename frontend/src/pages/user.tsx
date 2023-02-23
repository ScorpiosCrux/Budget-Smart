import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { useState, useContext } from "react";
import { UserContext } from "contexts/UserContext";
import axios from "axios";

type UserResponse = {
	_id: string;
	username: string;
};

const Profile = () => {
	const { userContext } = useContext(UserContext);
	const [data, setData] = useState<UserResponse>({ _id: "", username: "" });

	const getUser = () => {
		console.log("Old Token");
		console.log(userContext.token);
		axios({
			method: "GET",
			withCredentials: true,
			url: process.env.NEXT_PUBLIC_API_ENDPOINT + "/auth/user",
			headers: {
				authorization: "Bearer " + userContext.token,
			},
		}).then((res) => {
			console.log(res.data);
		});

		console.log("userContext");
		console.log(userContext);
	};

	return (
		<>
			<h1>User is:</h1>
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
