import { themes } from "@/theme";
import styled from "styled-components";
import { useDrag } from "react-dnd";
import TransactionGrid from "./TransactionGrid";
import StyledIcon from "../core/StyledIcon";
import { Category, Transaction } from "@/types";

/* MOVE THIS TO ANOTHER FILE */
const ItemTypes = {
	TRANSACTION: "transaction",
};

interface DropResult {
	allowedDropEffect: string;
	dropEffect: string;
	category: Category;
}

interface Props extends Transaction {
	sortTransaction(_id: string, categoryName: string): void;
}

const TransactionComponent = (props: Props) => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: ItemTypes.TRANSACTION,
		item: props, // unsure how the item is used here
		end(item, monitor) {
			const dropResult = monitor.getDropResult() as DropResult;
			if (item && dropResult) {
				props.sortTransaction(props._id, dropResult.category.name);
			}
		},
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));

	return (
		<TransactionWrapper ref={drag} isDragging={isDragging}>
			<TransactionGrid>
				<div className="drag">
					<StyledIcon src="drag.svg" height="100%" innerHeight="50%" innerWidth="50%" />
				</div>
				<div className="date">{props.date}</div>
				<div className="description">{props.description}</div>
				<div className="category">{props.category}</div>
				<div className="price">${props.price}</div>
				<div className="modifiers">
					<StyledIcon src="pencil.svg" height="40px" innerHeight="80%" innerWidth="80%" />
					<StyledIcon src="trash.svg" height="100%" innerHeight="80%" innerWidth="80%" />
				</div>
			</TransactionGrid>
		</TransactionWrapper>
	);
};

export default TransactionComponent;

const TransactionWrapper = styled.div<{ isDragging: boolean }>`
	opacity: ${(p) => (p.isDragging ? 0.5 : 1)};
	cursor: move;
	height: 40px;
	border-bottom: 1px solid ${themes.light.background};
`;
