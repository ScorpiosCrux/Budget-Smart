import StyledContainer from "@/components/core/StyledContainer";
import StyledHeader from "@/components/core/StyledHeader";
import CategoryComponent from "./Category";
import { ICategory, TargetType } from "@/types";
import { StyledCategories } from "./CategoryStyledComponents";
import StyledContent from "@/components/core/StyledContent";
import trashIcon from "public/assets/icons/trash-solid.svg";
import editIcon from "public/assets/icons/pencil-solid.svg";
import addIcon from "public/assets/icons/plus-solid.svg";
import Button from "@/components/buttons/Button";
import { useContextMenu } from "@/hooks/useContextMenu";
import ContextMenu from "@/components/core/ContextMenu";
import { useModal } from "@/hooks/useModal";
import Modal from "@/components/core/Modal";
import { SetStateAction, useEffect } from "react";
import { useCategories } from "@/hooks/useCategories";

interface Props {
  categories: ICategory[];
  setCategories: React.Dispatch<SetStateAction<ICategory[]>>;
  setIsCategoriesLoading: React.Dispatch<SetStateAction<boolean>>;
}

const CategoriesWidget = (props: Props) => {
  const { categories, setCategories, setIsCategoriesLoading } = props;
  const { handleDeleteCategory, handleCreateCategory } = useCategories({ setCategories, setIsCategoriesLoading });
  const { clicked, setClicked, points, setPoints, target, setTarget } = useContextMenu();
  const { showModal, setShowModal } = useModal();

  useEffect(() => {}, [categories]);

  return (
    <StyledContainer width="500px" height="90vh">
      <StyledContent>
        <StyledHeader>
          <div className="main">
            <div className="title">Categories</div>
            {/* <span className="helper-text">drag transactions below</span> */}
          </div>
          <div className="headerButtons">
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
        <StyledCategories>
          {props.categories.map((category: ICategory, i) => {
            return (
              <div
                onContextMenu={(e) => {
                  e.preventDefault();
                  setClicked(true);
                  setPoints({
                    x: e.pageX,
                    y: e.pageY,
                  });
                  setTarget(category);
                }}
                key={category._id}
              >
                <CategoryComponent category={category} />
              </div>
            );
          })}

          {/* Context Menu (right clicks on categories & transactions) */}
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
                    if (target) {
                      const categoryId = target._id;
                      handleDeleteCategory({ categoryId });
                    }
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
              targetType={TargetType.Category}
              handleCreateCategory={handleCreateCategory}
            />
          )}
        </StyledCategories>
      </StyledContent>
    </StyledContainer>
  );
};

export default CategoriesWidget;
