import { themes } from "@/theme";
import styled from "styled-components";
import Category from "../Category";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Transaction from "./Transaction";

import StyledHeader from "../core/StyledHeader";
import StyledContainer from "../core/StyledContainer";
import StyledWidget from "../core/StyledWidget";
import StyledTable from "../core/StyledTable";
import TransactionGrid from "./TransactionGrid";

const TransactionsWidget = () => {
	return (
		<StyledWidget>
			<StyledHeader>
				<span className="title">Transactions</span>
				<span className="helper-text">drag to sort</span>
			</StyledHeader>

			<StyledContainer width="700px" height="700px">
				{/* <StyledTable>
					<tbody>
						<tr className="table-header">
							<th></th>
							<th>Date</th>
							<th>Transaction Description</th>
							<th>Category</th>
							<th className="price">Price</th>
							<th></th>
						</tr>

						<Transaction
							_id={32}
							date="Feb 6, 2023"
							description="APPLE.COM/STORE"
							category="Groceries"
							price="$3200000.32"
						/>
					</tbody>
				</StyledTable> */}

				<TransactionGrid>
					<div className="date">Date</div>
					<div className="description">Transaction Description</div>
					<div className="category">Category</div>
					<div className="price">Price</div>
				</TransactionGrid>

				<Transaction
					_id={32}
					date="Feb 6, 2023"
					description="APPLE.COM/STORE"
					category="Groceries"
					price="$3200000.32"
				/>

				<Transaction
					_id={32}
					date="Feb 6, 2023"
					description="APPLE.COM/STORE"
					category="Groceries"
					price="$3200000.32"
				/>
			</StyledContainer>
		</StyledWidget>
	);
};

export default TransactionsWidget;
