import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRef } from "react";

export default function BasicMenu() {
	/* 
		In this case, useRef is used to access a DOM element directly!
	*/
	const inputFile = useRef<HTMLInputElement | null>(null);

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleImport = () => {
		handleClose();
		if (inputFile) {
			inputFile.current?.click();
		}
	};

	return (
		<div>
			<Button
				id="basic-button"
				aria-controls={open ? "basic-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
				sx={{ padding: 0 }}>
				Add Transactions
			</Button>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}>
				<MenuItem onClick={handleImport}>
					<input type="file" name="" id="" ref={inputFile} style={{ display: "none" }} />
					Import CSV
				</MenuItem>
				<MenuItem onClick={handleClose}>Manual</MenuItem>
			</Menu>
		</div>
	);
}
