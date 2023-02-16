import { themes } from "@/theme";
import { useDrop } from "react-dnd";
import styled from "styled-components";
import { ItemTypes } from "./Dashboard";

interface Props {
	index: number;
	category: string;
	price: number;
}

const Category = (props: Props) => {
	const [{ canDrop, isOver }, drop] = useDrop(() => ({
		accept: ItemTypes.TRANSACTION,
		drop: () => ({
			name: `${props.category}`,
		}),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	}));

	const isActive = canDrop && isOver;
	let backgroundColor = themes.light.primary;
	if (isActive) {
		backgroundColor = "darkgreen";
	} else if (canDrop) {
		backgroundColor = "darkkhaki";
	}

	return (
		<StyledCategory ref={drop} index={props.index} backgroundColor={backgroundColor}>
			<CategoryHeader>
				<div className="info">
					<img src="check.svg" alt="checkmark" />
					<span className="title">{props.category}</span>
				</div>
				<div className="category-modifiers">
					<img src="pencil.svg" alt="edit" />
					<img src="trash.svg" alt="delete" />
				</div>
			</CategoryHeader>
			<StyledContent>
				<span>Budget </span>
				<span className="emphasize">${props.price}</span>
				<span>Current Total</span>
				<span>${props.price}</span>
				<span>Remaining Credits</span>
				<span>${props.price}</span>
				<span>Remaining Per Day</span>
				<span className="emphasize">${props.price}</span>
			</StyledContent>
		</StyledCategory>
	);
};

export default Category;

const StyledCategory = styled.div<{ index: number; backgroundColor: string }>`
	width: 50%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;

	border-right: ${(p) => (p.index % 2 == 0 ? "1px solid black" : "none")};
	border-bottom: 1px solid black;
	background-color: ${(p) => p.backgroundColor};


	& img {
		margin: 0px 6px 0px 6px;
		width: 25px;
		aspect-ratio: 1;
	}
`;

const CategoryHeader = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px dashed ${themes.light.secondary};

	& span {
		text-transform: capitalize;
		font-weight: 600;
		font-size: 1rem;
	}

	& .info {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		& img {
			width: 12px;
			aspect-ratio: 1;
		}
	}

	& .category-modifiers {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.category-modifiers > img {
		margin: 0;
	}
`;

const StyledContent = styled.div`
	width: 100%;
	height: 100%;
	padding: 0.6rem;
	display: grid;
	grid-template-columns: 70% 30%;
	justify-content: end;
	gap: 0.5rem;

	& span {
		text-align: end;
		font-size: 0.75rem;
	}

	.emphasize {
		font-weight: 700;
	}
`;
