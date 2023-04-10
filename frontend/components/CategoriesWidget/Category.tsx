import { themes } from "@/theme";
import styled from "styled-components";
import { useDrop } from "react-dnd";

import { CategoryDNDHelper, CategoryInfo } from "./CategoryContents";

interface Props {
	index: number;
	category: string;
	price: number;
}

/* MOVE THIS TO ANOTHER FILE */
const ItemTypes = {
	TRANSACTION: "transaction",
};

const CategoryComponent = (props: Props) => {
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
		backgroundColor = themes.light.accent;
	} else if (canDrop) {
		backgroundColor = themes.light.secondary;
	}

	return (
		<StyledCategory index={props.index}>
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
			<StyledContent ref={drop} backgroundColor={backgroundColor}>
				{canDrop ? (
					<CategoryDNDHelper>
						<div>DROP</div>
						<div>TRANSACTION</div>
						<div>HERE</div>
					</CategoryDNDHelper>
				) : (
					<CategoryInfo>
						<span>Budget </span>
						<span className="emphasize">${props.price}</span>
						<span>Current Total</span>
						<span>${props.price}</span>
						<span>Remaining Credits</span>
						<span>${props.price}</span>
						<span>Remaining Per Day</span>
						<span className="emphasize">${props.price}</span>
					</CategoryInfo>
				)}
			</StyledContent>
		</StyledCategory>
	);
};

export default CategoryComponent;

const StyledCategory = styled.div<{ index: number }>`
	width: 50%;
	height: 130px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;

	border-right: ${(p) => (p.index % 2 == 0 ? "1px solid black" : "none")};
	border-bottom: 1px solid black;
	background-color: ${themes.light.primary};

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

const StyledContent = styled.div<{ backgroundColor: string }>`
	width: 100%;
	height: 100%;
	padding: 0.6rem;
	background-color: ${(props) => props.backgroundColor};
`;
