import { useDrag } from "react-dnd";
import { ItemTypes } from "./Dashboard";

const Transaction = () => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: ItemTypes.TRANSACTION,
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));
	return (
		<tr
			ref={drag}
			style={{
				opacity: isDragging ? 0.5 : 1,
				fontSize: 25,
				fontWeight: "bold",
				cursor: "move",
			}}>
			<td>Feb 6, 2023</td>
			<td>APPLE.COM/BILL</td>
			<td>$17.32</td>
		</tr>
	);
};

export default Transaction;
