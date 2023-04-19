import { themes } from "@/theme";
import { useDrop } from "react-dnd";
import { Category } from "@/types";
import StyledLine from "components/core/StyledLine";
import {
	StyledCategoryHeader,
	StyledCategory,
	StyledCategoryContent,
	StyledCategoryInfo,
	StyledCategoryDNDContainer,
} from "./CategoryStyledComponents";

interface Props {
	index: number;
	category: Category;
}

/* MOVE THIS TO ANOTHER FILE */
const ItemTypes = {
	TRANSACTION: "transaction",
};

const CategoryComponent = (props: Props) => {
	const [{ canDrop, isOver }, drop] = useDrop(() => ({
		accept: ItemTypes.TRANSACTION,
		drop: () => ({
			category: props.category,
		}),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	}));

	const isActive = canDrop && isOver;
	let backgroundColor = themes.light.primaryBackground;
	if (isActive) {
		backgroundColor = themes.light.accent;
	} else if (canDrop) {
		backgroundColor = themes.light.secondaryBackground;
	}

	return (
		<StyledCategory index={props.index}>
			<StyledCategoryHeader>
				<div className="info">
					<span className="title">{props.category.name}</span>
					{/* <img src="check.svg" alt="checkmark" /> */}
				</div>
			</StyledCategoryHeader>
			<StyledLine />
			<StyledCategoryContent ref={drop} backgroundColor={backgroundColor}>
				{canDrop ? (
					<StyledCategoryDNDContainer>
						<div>Drop</div>
						<div>Transaction</div>
						<div>Here</div>
					</StyledCategoryDNDContainer>
				) : (
					<StyledCategoryInfo>
						<span>Budget </span>
						<span>${props.category.budget.toFixed(2)}</span>
						<span>Total</span>
						<span>${props.category.totalSpent.toFixed(2)}</span>
						<span>Remaining</span>
						<span>${props.category.remainingBudget.toFixed(2)}</span>
					</StyledCategoryInfo>
				)}
			</StyledCategoryContent>
		</StyledCategory>
	);
};

export default CategoryComponent;
