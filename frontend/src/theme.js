export const themes = {
	/**
	 * DEPRECATED
	 */
	light: {
		/**
		 * Smart Budget Green Color
		 */
		accent: "#2AB514",
		/**
		 * Page background off white
		 */
		background: "#EBEBEB",
		/**
		 * Primary background color. White
		 */
		primaryBackground: "#FFF",
		/**
		 * Secondary background color. Gray
		 */
		secondaryBackground: "#939393",
	},

	/**
	 * Light mode
	 */
	lightMode: {
		/**
		 * Smart Budget green color with white text
		 */
		accent: { background: "#2AB514", text: "#FFF" },
		/**
		 * Page background off white
		 */
		background: "#EBEBEB",
		/**
		 * Primary background color. White
		 */
		primaryBackground: "#FFF",
		/**
		 * Secondary background color. Gray
		 */
		secondaryBackground: { background: "#939393" },
	},
};
// Theme Context https://reactjs.org/docs/context.html Good example

/* Add Constants for Text sizes */
export const typography = {
	title: {
		fontSize: "1.5rem",
		fontWeight: "700",
	},
	regular: {
		fontSize: "1rem",
		fontWeight: "300",
	},
	small: {
		fontSize: "0.75rem",
		fontWeight: "300",
	},
	bold: {
		fontSize: "1rem",
		fontWeight: "600",
	},
};
