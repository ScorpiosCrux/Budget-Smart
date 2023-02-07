import { useDrag } from "react-dnd";
import styled from "styled-components";
import { ItemTypes } from "./Dashboard";

interface Props {
	date: string;
	description: string;
	price: string;
}

const Transaction = (props: Props) => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: ItemTypes.TRANSACTION,
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
