import StyledContainer from "components/core/StyledContainer";
import StyledHeader from "components/core/StyledHeader";
import StyledWidget from "components/core/StyledWidget";
import CategoryComponent from "./Category";

import { Category } from "@/types";
import { StyledCategories } from "./CategoryStyledComponents";
import StyledContent from "components/core/StyledContent";

import addIcon from "public/assets/icons/plus-solid.svg";
import Button from "components/buttons/Button";

interface Props {
	categories: Category[];
}

const CategoriesWidget = (props: Props) => {
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
							return <CategoryComponent key={category._id} index={i} category={category} />;
						})}
					</StyledCategories>
					{/* <StyledSubHeader>
					<span>Resets March 1st - 12 Days Until Reset</span>
				</StyledSubHeader> */}
				</StyledContent>
			</StyledContainer>
		</StyledWidget>
	);
};

export default CategoriesWidget;
