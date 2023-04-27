import TransactionComponent from "./TransactionComponent";
import StyledHeader from "../../core/StyledHeader";
import StyledContainer from "../../core/StyledContainer";
import { TargetType, ITransaction } from "@/types";

import {
  StyledTransactionGrid,
  StyledTransactions,
  StyledTransactionsContainer,
  StyledTransactionsHeader,
} from "./TransactionStyledComponents";
import { useContextMenu } from "@/hooks/useContextMenu";
import ContextMenu from "@/components/core/ContextMenu";
import trashIcon from "public/assets/icons/trash-solid.svg";
import editIcon from "public/assets/icons/pencil-solid.svg";
import addIcon from "public/assets/icons/plus-solid.svg";

import Button from "@/components/buttons/Button";
import UploadFileButton from "@/components/buttons/UploadFileButton";
import { useModal } from "@/hooks/useModal";
import Modal from "@/components/core/Modal";
import StyledContent from "../../core/StyledContent";

interface Props {
  transactions: ITransaction[];
  sortTransactionHelper(_id: string, categoryName: string): void;
  uploadTransactionCSVHelper(file: File, retry?: boolean): void;
  deleteTransaction(_id: string): void;
}

const TransactionsWidget = (props: Props) => {
  const { clicked, setClicked, points, setPoints, target, setTarget } = useContextMenu();
  const { showModal, setShowModal } = useModal();

  return (
    <StyledContainer width="800px" height="90vh">
      <StyledContent>
        <StyledHeader>
          <div className="main">
            <span className="title">Transactions</span>
            <span className="helper-text">drag to sort</span>
          </div>
          <div className="headerButtons">
            <UploadFileButton action={props.uploadTransactionCSVHelper} />
            <Button
              icon={addIcon}
              height="2rem"
              isSquare={true}
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
            />
          </div>
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
            {props.transactions.map((transaction: ITransaction) => {
              return (
                <div
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setClicked(true);
                    setPoints({
                      x: e.pageX,
                      y: e.pageY,
                    });
                    setTarget(transaction);
                  }}
                  key={transaction._id}
                >
                  <TransactionComponent
                    sortTransactionHelper={props.sortTransactionHelper}
                    deleteTransaction={props.deleteTransaction}
                    _id={transaction._id}
                    date={transaction.date}
                    description={transaction.description}
                    category={transaction.category}
                    price={transaction.price}
                  />
                </div>
              );
            })}

            {clicked && (
              <ContextMenu
                pageX={points.x}
                pageY={points.y}
                menuItems={[
                  {
                    title: "Edit",
                    icon: editIcon,
                    action: () => {
                      console.log("Edit Clicked");
                    },
                    key: "MenuItemEdit",
                  },
                  {
                    title: "Delete",
                    icon: trashIcon,
                    action: () => {
                      console.log("Delete Clicked");
                      console.log(target);
                      if (target) props.deleteTransaction(target?._id);
                    },
                    key: "MenuItemDelete",
                  },
                ]}
              />
            )}

            {/* Modal for adding categories */}
            {showModal && (
              <Modal
                closeModal={() => {
                  setShowModal(false);
                }}
                targetType={TargetType.Transaction}
                addCategory={() => {
                  console.log("tewoijfw");
                }}
              />
            )}
          </StyledTransactionsContainer>
        </StyledTransactions>
      </StyledContent>
    </StyledContainer>
  );
};

export default TransactionsWidget;
