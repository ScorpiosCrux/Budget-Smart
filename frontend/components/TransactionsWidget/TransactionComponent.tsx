import { themes } from "@/theme";
import styled from "styled-components";
import { useDrag } from "react-dnd";
import StyledIcon from "../core/StyledIcon";
import { Category, Transaction } from "@/types";
import { StyledTransactionGrid, StyledTransactionWrapper } from "./TransactionStyledComponents";
import { useContextMenu } from "hooks/useContextMenu";
import MenuContext from "components/core/MenuContext";

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
	sortTransactionHelper(_id: string, categoryName: string): void;
	deleteTransaction(_id: string): void;
}

const TransactionComponent = (props: Props) => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: ItemTypes.TRANSACTION,
		item: props, // unsure how the item is used here
		end(item, monitor) {
			const dropResult = monitor.getDropResult() as DropResult;
			if (item && dropResult) {
				props.sortTransactionHelper(props._id, dropResult.category.name);
			}
		},
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));

	const { clicked, points, onContextMenuHandler } = useContextMenu();

	const deleteTransactionHelper = () => {
		console.log(props._id);
		props.deleteTransaction(props._id);
	};

	const editTransactionHelper = () => {
		console.log("edit");
	};

	return (
		<>
			<StyledTransactionWrapper
				ref={drag}
				isDragging={isDragging}
				onContextMenu={onContextMenuHandler}>
				<StyledTransactionGrid>
					<div className="date">{props.date}</div>
					<div className="description">{props.description}</div>
					<div className="category">{props.category}</div>
					<div className="price">${props.price.toFixed(2)}</div>
				</StyledTransactionGrid>
			</StyledTransactionWrapper>
			{clicked && (
				<MenuContext
					menuItems={[
						{
							title: "Edit",
							action: () => {
								console.log("Edit Clicked");
							},
							key: "MenuItemEdit",
						},
						{
							title: "Delete",
							action: () => {
								console.log("Delete Clicked");
							},
							key: "MenuItemDelete",
						},
					]}
					pageX={points.x}
					pageY={points.y}
				/>
			)}
		</>
	);
};

export default TransactionComponent;
