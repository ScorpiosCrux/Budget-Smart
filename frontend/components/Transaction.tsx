import { useDrag } from "react-dnd";
import styled from "styled-components";
import StyledIcon from "./core/StyledIcon";
import { DraggableRow } from "./core/StyledTable";
import { ItemTypes } from "./Dashboard";

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
		<DraggableRow ref={drag} isDragging={isDragging}>
			<td className="buttons">
				<StyledIcon src="drag.svg" height="100%" innerHeight="50%" innerWidth="50%" />
			</td>
			<td>{props.date}</td>
			<td>{props.description}</td>
			<td>{props.category}</td>
			<td className="price">{props.price}</td>
			<td className="buttons">
				<StyledIcon src="pencil.svg" height="100%" innerHeight="80%" innerWidth="80%" />
				<StyledIcon src="trash.svg" height="100%" innerHeight="80%" innerWidth="80%" />
			</td>
		</DraggableRow>
	);
};

export default Transaction;
