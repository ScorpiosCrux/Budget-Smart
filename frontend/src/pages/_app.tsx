import "@/styles/globals.css";
import Layout from "@/components/core/Layout";
import type { AppProps } from "next/app";
import { AuthContextProvider, UserContext } from "@/contexts/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AuthContextProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</AuthContextProvider>
	);
}
