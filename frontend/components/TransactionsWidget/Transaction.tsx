import { useDrag } from "react-dnd";
import styled from "styled-components";
import StyledIcon from "../core/StyledIcon";
import { DraggableRow } from "../core/StyledTable";
import { ItemTypes } from "../Dashboard";
import TransactionGrid from "./TransactionGrid";
import { themes } from "@/theme";

interface Props {
	_id: number;
	date: string;
	description: string;
	category: string;
	price: string;
}

interface DropResult {
	allowedDropEffect: string;
	dropEffect: string;
	name: string;
}

const Transaction = (props: Props) => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: ItemTypes.TRANSACTION,
		item: props, // unsure how the item is used here
		end(item, monitor) {
			const dropResult = monitor.getDropResult() as DropResult;
			if (item && dropResult) {
				alert(`You moved ${props.description} into ${dropResult.name}!`);
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
				<div className="price">{props.price}</div>
				<div className="modifiers">
					<StyledIcon src="pencil.svg" height="40px" innerHeight="80%" innerWidth="80%" />
					<StyledIcon src="trash.svg" height="100%" innerHeight="80%" innerWidth="80%" />
				</div>
			</TransactionGrid>
		</TransactionWrapper>
	);
};

export default Transaction;

const TransactionWrapper = styled.div<{ isDragging: boolean }>`
	opacity: ${(p) => (p.isDragging ? 0.5 : 1)};
	cursor: move;
	height: 40px;
	border-bottom: 1px solid ${themes.light.secondary};
`;
