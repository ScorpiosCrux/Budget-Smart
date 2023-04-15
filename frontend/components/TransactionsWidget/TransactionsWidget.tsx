import TransactionComponent from "./TransactionComponent";
import StyledHeader from "../core/StyledHeader";
import StyledContainer from "../core/StyledContainer";
import StyledWidget from "../core/StyledWidget";
import UploadTransactionsButton from "components/buttons/UploadTransactionsButton";
import { Transaction } from "@/types";
import StyledContent from "components/core/StyledContent";
import {
	StyledTransactionGrid,
	StyledTransactions,
	StyledTransactionsContainer,
	StyledTransactionsHeader,
} from "./TransactionStyledComponents";

interface Props {
	transactions: Transaction[];
	sortTransactionHelper(_id: string, categoryName: string): void;
	uploadTransactionCSVHelper(file: File, retry?: boolean): void;
	deleteTransaction(_id: string): void;
}

const TransactionsWidget = (props: Props) => {
	return (
		<StyledWidget>
			<StyledContainer width="800px" height="900px">
				<StyledContent>
					<StyledHeader>
						<div className="main">
							<span className="title">Transactions</span>
							<span className="helper-text">drag to sort</span>
						</div>
						<UploadTransactionsButton
							uploadTransactionCSVHelper={props.uploadTransactionCSVHelper}
						/>
					</StyledHeader>

					<StyledTransactions>
						<StyledTransactionsHeader>
							<StyledTransactionGrid>
								<div className="date header">Date</div>
								<div className="description header">Transaction Description</div>
								<div className="category header">Category</div>
								<div className="price header">Price</div>
							</StyledTransactionGrid>
						</StyledTransactionsHeader>
						<StyledTransactionsContainer>
							{props.transactions.map((post: Transaction) => {
								return (
									<TransactionComponent
										sortTransactionHelper={props.sortTransactionHelper}
										deleteTransaction={props.deleteTransaction}
										key={post._id}
										_id={post._id}
										date={post.date}
										description={post.description}
										category={post.category}
										price={post.price}
									/>
								);
							})}
						</StyledTransactionsContainer>
					</StyledTransactions>
				</StyledContent>
			</StyledContainer>
		</StyledWidget>
	);
};

export default TransactionsWidget;
