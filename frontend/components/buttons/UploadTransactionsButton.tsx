import * as React from "react";
import Button from "@mui/material/Button";
import { useRef } from "react";
import { useTransactions } from "hooks/useTransactions";

export default function UploadTransactionsButton() {
	const { sendCSV } = useTransactions();

	/* 
		In this case, useRef is used to access a DOM element directly!
	*/
	const inputFileBtn = useRef<HTMLInputElement | null>(null);

	const handleOpenFileDialog = () => {
		if (inputFileBtn) {
			inputFileBtn.current?.click();
		}
	};

	const handleImport = (event: React.FormEvent<HTMLInputElement>) => {
		try {
			const file = (event.target as HTMLInputElement).files![0]; // ! tells it to ignore the possibility that files is null
			if (!file) return;

			console.log(file);
			sendCSV(file);
		} catch (error) {}
	};

	return (
		<div>
			<Button id="uploadCSVBtn" onClick={handleOpenFileDialog} sx={{ padding: 0 }}>
				Upload CSV
			</Button>
			<input
				type="file"
				name="inputFile"
				ref={inputFileBtn}
				onChange={handleImport}
				style={{ display: "none" }}
			/>
		</div>
	);
}
