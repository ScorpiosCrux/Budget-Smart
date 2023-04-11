import StyledContainer from "components/core/StyledContainer";
import StyledHeader from "components/core/StyledHeader";
import StyledWidget from "components/core/StyledWidget";
import CategoryComponent from "./Category";
import StyledSubHeader from "components/core/StyledSubHeader";
import CategoriesContent from "./CategoriesContent";
import { Category } from "@/types";

interface Props {
	categories: Category[];
}

const CategoriesWidget = (props: Props) => {
	return (
		<StyledWidget>
			<StyledHeader>
				<div className="main">
					<div className="title">Categories</div>
					<span className="helper-text">drag transactions below</span>
				</div>
			</StyledHeader>
			<StyledContainer width="400px" height="700px">
				<StyledSubHeader>
					<span>Resets March 1st - 12 Days Until Reset</span>
				</StyledSubHeader>
				<CategoriesContent>
					{props.categories.map((category: Category, i) => {
						return <CategoryComponent key={category._id} index={i} category={category} />;
					})}
				</CategoriesContent>
			</StyledContainer>
		</StyledWidget>
	);
};

export default CategoriesWidget;
