import type { CSSProperties, FC } from "react";
import { useDrop } from "react-dnd";
import styled from "styled-components";
import { ItemTypes } from "./Dashboard";

interface Props {
	category: string;
	price: number;
}

const Category = (props: Props) => {
	const [{ canDrop, isOver }, drop] = useDrop(() => ({
		accept: ItemTypes.TRANSACTION,
		drop: () => ({
			name: `Dustbin`,
		}),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	}));

	const isActive = canDrop && isOver;
	let backgroundColor = "#222";
	if (isActive) {
		backgroundColor = "darkgreen";
	} else if (canDrop) {
		backgroundColor = "darkkhaki";
	}

	return (
		<StyledCategory ref={drop} backgroundColor={backgroundColor}>
			<span className="category-title">{props.category}</span>
			<div>
				<span>Total: </span>
				<span>${props.price}</span>
			</div>
		</StyledCategory>
	);
};

export default Category;

const StyledCategory = styled.div<{backgroundColor: string}>`
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 2px dotted black;
	background-color: ${p => p.backgroundColor};

	.category-title {
		text-transform: uppercase;
	}
`;
