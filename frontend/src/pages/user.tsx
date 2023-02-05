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
	const { userContext, setUserContext } = useContext(UserContext);
	const [data, setData] = useState<UserResponse>({ _id: "", username: "" });

	const getUser = () => {
		// axios({
		// 	method: "GET",
		// 	withCredentials: true,
		// 	url: "http://localhost:4000/user",
		// }).then((res: any) => {
		// 	const { _id, username } = res.data;
		// 	setData({ _id, username });
		// 	console.log(userContext);
		// });
		console.log("userContext")
		console.log(userContext)
	};

	return (
		<>
			<h1>User is:</h1>
			<p>{userContext._id}</p>
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
