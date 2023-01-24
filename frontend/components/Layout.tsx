import Navbar from "./Navbar";

type Props = {
	children: JSX.Element;
};

const Layout = ({ children }: Props) => {
	return (
		<div className="layout">
			<Navbar />
			<div className="content">{children}</div>
		</div>
	);
};

export default Layout;
