import styled from "styled-components";
import Category from "./Category";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Transaction from "./Transaction";

export const ItemTypes = {
	TRANSACTION: "transaction",
};

const Dashboard = () => {
	return (
		<DndProvider backend={HTML5Backend}>
			<DashboardContainer>
				<h1>Organize Your Spendings!</h1>
				<div className="controls">
					<button>Import Transactions</button>
				</div>
				<div className="sorter">
					<div className="transactions">
						<h2>Transactions</h2>

						<table>
							<tbody>
								<tr>
									<th></th>
									<th>Date</th>
									<th>Transaction Description</th>
									<th>Price</th>
								</tr>

								<Transaction date="Feb 6, 2023" description="Test" price="$32.32" />
								<Transaction date="Feb 6, 2023" description="Test" price="$32.32" />
								<Transaction date="Feb 6, 2023" description="Test" price="$32.32" />
								<Transaction date="Feb 6, 2023" description="Test" price="$32.32" />
							</tbody>
						</table>
					</div>
					<div>
						<h2>Categories</h2>
						<div className="categories">
							<Category index={0} category="food" price={32.0} />
							<Category index={0} category="tech" price={1000.85} />
							<Category index={0} category="utilities" price={322.32} />
						</div>
					</div>
				</div>
			</DashboardContainer>
		</DndProvider>
	);
};

export default Dashboard;

const DashboardContainer = styled.div`
	height: fit-content;
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	justify-content: center;
	align-items: flex-start;
	width: 1000px;
	row-gap: 10px;

	border-radius: 10px;
	padding: 2rem;

	h1 {
		grid-column-start: 1;
		grid-column-end: 13;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.controls {
		grid-column-start: 1;
		grid-column-end: 13;
		height: 50px;
		display: flex;
		justify-content: center;
	}

	.sorter {
		grid-column-start: 1;
		grid-column-end: 13;
		border-radius: 10px;

		display: grid;
		grid-template-columns: 60% 40%;

		padding: 1rem;

		background-color: grey;
	}

	.transactions {
		table {
			width: 100%;

			th {
				text-align: left;
				border-bottom: 1px black solid;
			}
		}
	}

	.categories {
	}
`;
