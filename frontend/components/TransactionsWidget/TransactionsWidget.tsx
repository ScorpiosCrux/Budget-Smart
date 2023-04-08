import TransactionComponent from "./Transaction";
import StyledHeader from "../core/StyledHeader";
import StyledContainer from "../core/StyledContainer";
import StyledWidget from "../core/StyledWidget";
import TransactionGrid from "./TransactionGrid";
import StyledTransactionsHeader from "./TransactionsHeader";
import StyledTransactionsContent from "./TransactionsContent";
import UploadTransactionsButton from "components/buttons/UploadTransactionsButton";
import { useTransactions } from "hooks/useTransactions";
import { useAuth } from "hooks/useAuth";
import {Transaction } from "@/types";

const TransactionsWidget = () => {
	const { isLoading, transactions, sortTransaction } = useTransactions();
	const { user, refreshToken } = useAuth();

	return (
		<StyledWidget>
			<StyledHeader>
				<div className="main">
					<span className="title">Transactions</span>
					<span className="helper-text">drag to sort</span>
				</div>
				<UploadTransactionsButton />
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
						transactions.map((post: Transaction) => {
							return (
								<TransactionComponent
									sortTransaction={sortTransaction}
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
