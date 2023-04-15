import { MouseEventHandler, useEffect, useState } from "react";

export const useContextMenu = () => {
	const [clicked, setClicked] = useState(false);
	const [points, setPoints] = useState({
		x: 0,
		y: 0,
	});

	/* Used to close the menu when user clicks anywhere else */
	useEffect(() => {
		const handleClick = () => setClicked(false);

		window.addEventListener("click", handleClick);
		// window.addEventListener("scroll", handleClick);
		return () => {
			window.removeEventListener("click", handleClick);
			// window.addEventListener("scroll", handleClick);
		};
	}, []);

	/* Prevent default right click function */
	const onContextMenuHandler = (e: any) => {
		e.preventDefault();
		setClicked(true);
		setPoints({
			x: e.pageX,
			y: e.pageY,
		});
		console.log("Right Click", e.pageX, e.pageY);
	};

	return { clicked, points, onContextMenuHandler };
};
