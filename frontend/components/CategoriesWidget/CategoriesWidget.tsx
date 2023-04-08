import StyledContainer from "components/core/StyledContainer";
import StyledHeader from "components/core/StyledHeader";
import StyledWidget from "components/core/StyledWidget";
import Category from "./Category";
import StyledSubHeader from "components/core/StyledSubHeader";
import CategoriesContent from "./CategoriesContent";

const CategoriesWidget = () => {
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
					<Category index={0} category="Tech" price={500} />
					<Category index={1} category="Groceries" price={400} />
					<Category index={2} category="Eating Out" price={150} />
				</CategoriesContent>
			</StyledContainer>
		</StyledWidget>
	);
};

export default CategoriesWidget;
