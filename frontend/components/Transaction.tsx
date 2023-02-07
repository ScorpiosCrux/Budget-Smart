import { useDrag } from "react-dnd";
import styled from "styled-components";
import { ItemTypes } from "./Dashboard";

interface Props {
	date: string;
	description: string;
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
		<TransactionRow ref={drag} isDragging={isDragging}>
			<td>{props.date}</td>
			<td>{props.description}</td>
			<td>{props.price}</td>
		</TransactionRow>
	);
};

export default Transaction;

const TransactionRow = styled.tr<{ isDragging: boolean }>`
	opacity: ${(p) => (p.isDragging ? 0.5 : 1)};
	cursor: move;
`;
