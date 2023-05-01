import "@/styles/globals.css";
import Layout from "@/components/core/Layout";
import type { AppProps } from "next/app";
import { AuthContextProvider, UserContext } from "@/contexts/AuthContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AuthContextProvider>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</LocalizationProvider>
		</AuthContextProvider>
	);
}
