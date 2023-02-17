import { themes } from "@/theme";
import styled from "styled-components";
import Category from "./Category";


const CategoriesWidget = () => {
	return (
		<Widget>
			<div className="header">Categories</div>
			<div className="main-container">
				<div className="sub-header">12 days until reset</div>
				<div className="content">
					<Category index={0} category="Tech" price={32} />
					<Category index={1} category="Tech" price={32} />
					<Category index={2} category="Tech" price={32} />
					<Category index={3} category="Tech" price={32} />
				</div>
			</div>
		</Widget>
	);
};

export default CategoriesWidget;

const Widget = styled.div`
	padding-top: 70px;

	.main-container {
		width: 400px;
		height: 700px;
		background-color: ${themes.light.primary};
		border-radius: 10px;
	}

	.header {
		font-weight: 700;
		font-size: 20px;
		padding-bottom: 15px;
	}

	.sub-header {
		padding: 10px;
		border-radius: 10px 10px 0px 0px;
		height: 30px;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #000000;
	}

	.content {
		display: flex;
		flex-wrap: wrap;
	}
`;
