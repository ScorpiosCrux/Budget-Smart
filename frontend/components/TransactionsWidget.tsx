import { themes } from "@/theme";
import styled from "styled-components";
import Category from "./Category";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Transaction from "./Transaction";

import StyledHeader from "./core/StyledHeader";
import StyledContainer from "./core/StyledContainer";
import StyledWidget from "./core/StyledWidget";
import StyledTable from "./core/StyledTable";

const TransactionsWidget = () => {
	return (
		<StyledWidget>
			<StyledHeader>
				<span className="title">Transactions</span>
				<span className="helper-text">drag to sort</span>
			</StyledHeader>

			<StyledContainer width="700px" height="700px">
				<StyledTable>
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
				</StyledTable>
			</StyledContainer>
		</StyledWidget>
	);
};

export default TransactionsWidget;

const Widget = styled.div`
	padding-top: 70px;

	.main-container {
		width: 700px;
		height: 700px;
		background-color: ${themes.light.primary};
		border-radius: 0.75rem;
	}

	.sub-header {
		padding: 10px;
		border-radius: 10px 10px 0px 0px;
		height: 30px;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #000000;
	}

	.content {
		display: flex;
		flex-wrap: wrap;
	}
`;
