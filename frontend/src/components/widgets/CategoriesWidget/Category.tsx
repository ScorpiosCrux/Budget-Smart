import { themes } from "@/theme";
import { useDrop } from "react-dnd";
import { ICategory } from "@/types";
import StyledLine from "@/components/core/StyledLine";
import {
  StyledCategoryHeader,
  StyledCategory,
  StyledCategoryContent,
  StyledCategoryInfo,
  StyledCategoryDNDContainer,
} from "./CategoryStyledComponents";

/* MOVE THIS TO ANOTHER FILE */
const ItemTypes = {
  TRANSACTION: "transaction",
};

interface Props {
  category: ICategory;
}
const CategoryComponent = (props: Props) => {
  const { category } = props;
  const { _id, userId, name, budget, remainingBudget, totalSpent, remainingBudgetPerDay } =
    category;

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.TRANSACTION,
    drop: () => ({
      category: props.category,
    }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;
  let backgroundColor = themes.light.primaryBackground;
  if (isActive) {
    backgroundColor = themes.light.accent;
  } else if (canDrop) {
    backgroundColor = themes.light.secondaryBackground;
  }

  return (
    <StyledCategory>
      <StyledCategoryHeader>
        <div className="info">
          <span className="title">{name}</span>
          {/* <img src="check.svg" alt="checkmark" /> */}
        </div>
      </StyledCategoryHeader>
      <StyledLine />
      <StyledCategoryContent ref={drop} backgroundColor={backgroundColor}>
        {canDrop ? (
          <StyledCategoryDNDContainer>
            <div>Drop</div>
            <div>Transaction</div>
            <div>Here</div>
          </StyledCategoryDNDContainer>
        ) : (
          <StyledCategoryInfo>
            <span>Budget </span>
            <span>${budget.toFixed(2)}</span>
            <span>Total</span>
            <span>${totalSpent.toFixed(2)}</span>
            <span>Remaining</span>
            <span>${remainingBudget.toFixed(2)}</span>
          </StyledCategoryInfo>
        )}
      </StyledCategoryContent>
    </StyledCategory>
  );
};

export default CategoryComponent;
