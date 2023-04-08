import Transaction, { TransactionInterface } from "./Transaction";
import StyledHeader from "../core/StyledHeader";
import StyledContainer from "../core/StyledContainer";
import StyledWidget from "../core/StyledWidget";
import TransactionGrid from "./TransactionGrid";
import StyledTransactionsHeader from "./TransactionsHeader";
import StyledTransactionsContent from "./TransactionsContent";
import MenuButton from "components/buttons/AddTransactionsMenuButton";
import UploadTransactionsButton from "components/buttons/UploadTransactionsButton";
import { useTransactions } from "hooks/useTransactions";
import { useEffect } from "react";

const TransactionsWidget = () => {
	const { isLoading, transactions } = useTransactions();

	useEffect(() => {console.log(transactions)}, [transactions])

	return (
		<StyledWidget>
			<StyledHeader>
				<div className="main">
					<span className="title">Transactions</span>
					<span className="helper-text">drag to sort</span>
				</div>
				<UploadTransactionsButton/>
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

				<StyledTransactionsContent>
					{isLoading === false &&
						transactions.map((post: TransactionInterface) => {
							return (
								<Transaction
									key={post._id}
									_id={post._id}
									date={post.date}
									description={post.description}
									category={post.category}
									price={post.price}
								/>
							);
						})}
				</StyledTransactionsContent>
			</StyledContainer>
		</StyledWidget>
	);
};

export default TransactionsWidget;
