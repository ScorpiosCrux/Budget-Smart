import Transaction from "./Transaction";
import StyledHeader from "../core/StyledHeader";
import StyledContainer from "../core/StyledContainer";
import StyledWidget from "../core/StyledWidget";
import TransactionGrid from "./TransactionGrid";
import StyledTransactionsHeader from "./TransactionsHeader";

const TransactionsWidget = () => {
	return (
		<StyledWidget>
			<StyledHeader>
				<span className="title">Transactions</span>
				<span className="helper-text">drag to sort</span>
			</StyledHeader>

			<StyledContainer width="700px" height="700px">
				<StyledTransactionsHeader>
					<TransactionGrid>
						<div className="date header">Date</div>
						<div className="description header">Transaction Description</div>
						<div className="category header">Category</div>
						<div className="price header">Price</div>
					</TransactionGrid>
				</StyledTransactionsHeader>

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
