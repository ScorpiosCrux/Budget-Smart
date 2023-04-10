import StyledContainer from "components/core/StyledContainer";
import StyledHeader from "components/core/StyledHeader";
import StyledWidget from "components/core/StyledWidget";
import CategoryComponent from "./Category";
import StyledSubHeader from "components/core/StyledSubHeader";
import CategoriesContent from "./CategoriesContent";
import { useCategories } from "hooks/useCategories";
import { Category } from "@/types";

const CategoriesWidget = () => {
	const { isLoading, categories } = useCategories();

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
					{isLoading === false &&
						categories.map((category: Category, i) => {
							return <CategoryComponent index={i} category={category.name} price={category.budget} />;
						})}
				</CategoriesContent>
			</StyledContainer>
		</StyledWidget>
	);
};

export default CategoriesWidget;
