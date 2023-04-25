import Image, { StaticImageData } from "next/image";
import styled from "styled-components";

interface Props {
	image: StaticImageData;
	alt: string;
	width: string;
}

const Icon = (props: Props) => {
	return (
		<StyledIcon width={props.width}>
			<Image src={props.image} alt={props.alt} />
		</StyledIcon>
	);
};

export default Icon;

const StyledIcon = styled.div<{ width: string }>`
	width: ${(props) => props.width};
	height: ${(props) => props.width};

	& img {
		object-fit: contain;
		width: 100%;
		height: 100%;
	}
`;
