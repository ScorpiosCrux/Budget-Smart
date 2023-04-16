import StyledContainer from "components/core/StyledContainer";
import StyledHeader from "components/core/StyledHeader";
import StyledWidget from "components/core/StyledWidget";
import CategoryComponent from "./Category";

import { Category } from "@/types";
import { StyledCategories } from "./CategoryStyledComponents";
import StyledContent from "components/core/StyledContent";

import trashIcon from "public/assets/icons/trash-solid.svg";
import editIcon from "public/assets/icons/pencil-solid.svg";
import addIcon from "public/assets/icons/plus-solid.svg";
import Button from "components/buttons/Button";
import { useContextMenu } from "hooks/useContextMenu";
import ContextMenu from "components/core/ContextMenu";

interface Props {
	categories: Category[];
}

const CategoriesWidget = (props: Props) => {
	const { clicked, setClicked, points, setPoints, target, setTarget } = useContextMenu();

	return (
		<StyledWidget>
			<StyledContainer width="500px" height="900px">
				<StyledContent>
					<StyledHeader>
						<div className="main">
							<div className="title">Categories</div>
							{/* <span className="helper-text">drag transactions below</span> */}
						</div>
						<div className="headerButtons">
							<Button icon={addIcon} height="2rem" isSquare={true} />
						</div>
					</StyledHeader>
					<StyledCategories>
						{props.categories.map((category: Category, i) => {
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
									key={category._id}>
									<CategoryComponent index={i} category={category} />
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
											// if (target) props.deleteTransaction(target?._id);
										},
										key: "MenuItemDelete",
									},
								]}
							/>
						)}
					</StyledCategories>
				</StyledContent>
			</StyledContainer>
		</StyledWidget>
	);
};

export default CategoriesWidget;
