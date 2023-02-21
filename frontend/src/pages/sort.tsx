import axios from "axios";
import CategoriesWidget from "components/CategoriesWidget/CategoriesWidget";
import Layout from "components/Layout";
import TransactionsWidget from "components/TransactionsWidget/TransactionsWidget";
import Head from "next/head";
import styled from "styled-components";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect, useState } from "react";

export default function Sort() {
	const [isLoaded, setIsLoaded] = useState(false);
	const [posts, setPosts] = useState([{}]);

	const getTransactions = () => {};

	useEffect(() => {
		axios({
			method: "GET",
			withCredentials: true,
			url: process.env.NEXT_PUBLIC_API_ENDPOINT + "/transactions",
		})
			.then((res) => {
				setPosts(Array.from(res.data));
				setIsLoaded(true);
			})
			.catch((error) => {
				console.log("Error!");
				console.log(error);
			});
	}, []);

	/* This print is outdated and will basically print nothing - testing  */
	useEffect(() => {
		console.log(typeof posts);
		console.log(posts);
	}, []);

	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<SortWrapper>
				<DndProvider backend={HTML5Backend}>
					<CategoriesWidget />
					<TransactionsWidget posts={posts}/>
				</DndProvider>
			</SortWrapper>
		</>
	);
}

const SortWrapper = styled.div`
	display: flex;
	gap: 2rem;
`;
