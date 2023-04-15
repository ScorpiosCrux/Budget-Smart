import StyledContainer from "components/core/StyledContainer";
import StyledHeader from "components/core/StyledHeader";
import StyledWidget from "components/core/StyledWidget";
import CategoryComponent from "./Category";
import StyledSubHeader from "components/core/StyledSubHeader";

import { Category } from "@/types";
import { StyledCategories, StyledCategoriesContent } from "./CategoryStyledComponents";

interface Props {
	categories: Category[];
}

const CategoriesWidget = (props: Props) => {
	return (
		<StyledWidget>
			<StyledContainer width="500px" height="900px">
				<StyledCategoriesContent>
					<StyledHeader>
						<div className="main">
							<div className="title">Categories</div>
							{/* <span className="helper-text">drag transactions below</span> */}
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
				</StyledCategoriesContent>
			</StyledContainer>
		</StyledWidget>
	);
};

export default CategoriesWidget;
