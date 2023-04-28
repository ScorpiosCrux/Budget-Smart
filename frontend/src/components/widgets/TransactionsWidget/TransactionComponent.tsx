import { useDrag } from "react-dnd";
import { ICategory, ITransaction } from "@/types";
import { StyledTransactionGrid, StyledTransactionWrapper } from "./TransactionStyledComponents";

/* MOVE THIS TO ANOTHER FILE */
const ItemTypes = {
  TRANSACTION: "transaction",
};

interface DropResult {
  allowedDropEffect: string;
  dropEffect: string;
  category: ICategory;
}

interface Props {
  transaction: ITransaction;
  sortTransaction(transaction: ITransaction, category: ICategory): void;
  // deleteTransaction(_id: string): void;
}
const TransactionComponent = (props: Props) => {
  const { transaction, sortTransaction } = props;
  const { _id, date, description, price, category } = transaction;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TRANSACTION,
    item: props, // unsure how the item is used here
    end(item, monitor) {
      const dropResult = monitor.getDropResult() as DropResult;
      if (item && dropResult) {
        sortTransaction(transaction, dropResult.category);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // const deleteTransactionHelper = () => {
  //   console.log(_id);
  //   props.deleteTransaction(_id);
  // };

  // const editTransactionHelper = () => {
  //   console.log("edit");
  // };

  return (
    <StyledTransactionWrapper ref={drag} isDragging={isDragging}>
      <StyledTransactionGrid>
        <div className="date">{date}</div>
        <div className="description">{description}</div>
        <div className="category">{category}</div>
        <div className="price">${price.toFixed(2)}</div>
      </StyledTransactionGrid>
    </StyledTransactionWrapper>
  );
};

export default TransactionComponent;
