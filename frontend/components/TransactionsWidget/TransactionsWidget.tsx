import Transaction, { TransactionInterface } from "./Transaction";
import StyledHeader from "../core/StyledHeader";
import StyledContainer from "../core/StyledContainer";
import StyledWidget from "../core/StyledWidget";
import TransactionGrid from "./TransactionGrid";
import StyledTransactionsHeader from "./TransactionsHeader";
import StyledIcon from "components/core/StyledIcon";

/* Move AXIOS call down? */
interface Props {
	posts: Array<any>;
}

const TransactionsWidget = (props: Props) => {
	return (
		<StyledWidget>
			<StyledHeader>
				<div className="main">
					<span className="title">Transactions</span>
					<span className="helper-text">drag to sort</span>
				</div>

				<div className="header-button" onClick={() => alert("Clicked!")}>
					<StyledIcon src="add.svg" height="100%" innerWidth="100%" innerHeight="100%" />
					<span>Add Transactions</span>
				</div>
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

				{props.posts.map((post: TransactionInterface) => {
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
			</StyledContainer>
		</StyledWidget>
	);
};

export default TransactionsWidget;
